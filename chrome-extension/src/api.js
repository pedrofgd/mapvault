const BASE_URL = "http://localhost:5149/api";

export async function createNote(title, location) {
    const url = "v1/notes/create";
    const data = {
        title,
        categories: ["From Chrome Extension"],
        description: `Location: ${location}`,
        exceptionMessage: null,
        highlightMessage: false,
        content: "..."
    };

    const response = await postAsync(url, data);
    const note = await response.json();
    return note;
}

export async function createRemark(remark, noteId) {
    const url = "v1/remarks/create";
    const data = {
        remark,
        noteId
    };

    await postAsync(url, data);
}

async function postAsync(path, data) {
    return await fetch(`${BASE_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
