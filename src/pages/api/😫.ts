export const prerender = false;
import type { APIRoute } from "astro";
import { processInput } from "../../lib/server/🤖";

export const POST: APIRoute = async ({ request }) => {

    const data = await request.formData();
    const input = data.get("🤮");

    const html = await processInput(input.toString());

    if (!input) {
        return new Response(
            JSON.stringify({
                html,
            }),
            { status: 400 },
        );
    }

    return new Response(
        JSON.stringify({
            html,
        }),
        { status: 200 },
    );
}