export async function submitQuery(formData: FormData): Promise<void> {
    
    const response = await fetch("/api/😫", {
        method: "POST",
        body: formData,
    });

    const result = response.status === 200 ? await response.json() : { html: `Yeah, ok. Sure.` };
    document.querySelectorAll(".response").forEach(_e => { _e.innerHTML = result.html });
    toggleView(true);
}

export function toggleView(showResponse: boolean | undefined) {

    const responseWrapper = (document.querySelector(".response-wrapper") as HTMLElement);
    const startContent = (document.querySelector(".start-content") as HTMLElement);

    showResponse ??= responseWrapper.hidden;

    responseWrapper.hidden = !showResponse;
    startContent.hidden = showResponse;
}