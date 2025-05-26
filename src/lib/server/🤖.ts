import retextEnglish from "retext-english";
import retextProfanitiesEn from "retext-profanities/en";
import { retext } from "retext";
import { getCollection, getEntry } from "astro:content";

export type ModelContext = {
    input: string;
}

export async function processInput(input: string): Promise<string> {

    const context: ModelContext = { input };

    const suggested = (await getCollection("suggestedPromps")).find(k => k.id === input);
    if (suggested) {
        return await getFromSuggested(suggested.id);
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

async function getFromSuggested(key: string): Promise<string> {
    return (await getEntry("suggestedPromps", key)).data;
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