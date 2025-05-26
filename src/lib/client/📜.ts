export async function submitQuery(formData: FormData): Promise<void> {
    
    const response = await fetch("/api/😫", {
        method: "POST",
        body: formData,
    });

    const result = response.status === 200 ? await response.json() : { html: `Yeah, ok. Sure.` };
    document.querySelectorAll(".response-wrapper").forEach(_e => { _e.innerHTML = result.html });
}