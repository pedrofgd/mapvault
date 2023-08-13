const BASE_URL = "http://localhost:5149/api";

export async function createNote(title, alias, location) {
    const url = "v1/notes/create";
    const data = {
        title,
        alias,
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

export async function getNoteByAlias(alias) {
    const url = `v1/notes/alias/${alias}`;
    const response = await getAsync(url);
    const note = await response.json();
    return note;
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

async function getAsync(path) {
    return await fetch(`${BASE_URL}/${path}`);
}
