export const prerender = false;
import type { APIRoute } from "astro";
import { processPrompt } from "../../lib/server/🤖";

export const POST: APIRoute = async ({ request }) => {
    const result = await processPrompt(await request.formData());

    if (!result) {
        return new Response(
            JSON.stringify({
                html: "<p>Stop wasting my time!</p>",
                key: "zilch",
            }),
            { status: 400 },
        );
    }

    return new Response(
        JSON.stringify(result),
        { status: 200 },
    );
}