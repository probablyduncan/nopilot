import retextEnglish from "retext-english";
import retextProfanitiesEn from "retext-profanities/en";
import { retext } from "retext";
import { getCollection } from "astro:content";
import { shuffleRef } from "@probablyduncan/common";

export type PromptResponse = {
    key: string;
    html: string;
}

const ALL_RESPONSES = await getCollection("responses");

export async function processPrompt(data: FormData): Promise<PromptResponse | undefined> {

    let response = await tryGetSuggestedResponse(data);

    if (response === undefined) {
        shuffleRef(ALL_RESPONSES);
        response = ALL_RESPONSES.find(response => response.data.random);
    }

    return {
        key: response.id,
        html: response.rendered.html,
    }
}

async function tryGetSuggestedResponse(data: FormData): Promise<typeof ALL_RESPONSES[number] | undefined> {

    const suggestedKey = data.get("😵‍💫")?.toString();

    if (!suggestedKey) {
        return undefined;
    }

    const suggestedResponse = ALL_RESPONSES.find(response => response.id === suggestedKey && response.data.suggested);
    return suggestedResponse;
}

export async function processInput(input: string): Promise<string> {

    const suggested = (await getCollection("responses")).find(k => k.id === input);
    if (suggested) {
        return suggested.rendered.html;
    }

    let getResponse: InputHandler["getResponse"];
    let numItems = 0;
    for (let i = 0; i < options.length; i++) {
        const isValid = await options[i].canRespond(input);
        if (!isValid) {
            continue;
        }

        numItems++;
        if (numItems === 1 || Math.random() > 1 / (numItems + 1)) {
            getResponse = options[i].getResponse;
        }
    }

    return await getResponse(input);
}




interface InputHandler {
    canRespond(input: string): Promise<boolean>;
    getResponse(input: string): Promise<string>;
}








class ProfanityHandler implements InputHandler {

    private _messages: any[];

    async canRespond(input: string): Promise<boolean> {
        const parse = await retext().use(retextEnglish).use(retextProfanitiesEn).process(input);
        this._messages = parse.messages;
        return this._messages.length > 0;
    }
    async getResponse(): Promise<string> {
        return `<p>Watch your mouth!</p><p>-1 social credit.</p>`;
    }

}

const mock: InputHandler = {
    canRespond: async () => true,
    getResponse: async (input) => `<p>“${input}”</p><p>💀💀💀</p>`,
}

const options: InputHandler[] = [
    mock, new ProfanityHandler(),
];