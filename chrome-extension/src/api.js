export async function createNote(title, location) {
    const url = "http://localhost:5149/api/v1/notes/create";
    const data = {
        title,
        categories: ["From Chrome Extension"],
        description: `Location: ${location}`,
        exceptionMessage: null,
        highlightMessage: false,
        content: "..."
    };

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        referrerPolicy: "no-referrer"
    });
}
