export async function submitQuery(form: HTMLFormElement, event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const response = await fetch("/api/😫", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();

    if (response.status === 200) {
        form.reset();
        document.querySelectorAll(".response-wrapper").forEach(_e => { _e.innerHTML = data.html });
    }

}