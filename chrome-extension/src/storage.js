let NOTE_ID_CURRENT_LOCATION = "";

export async function storeHighlight(selection, host, pathname) {
    console.log("Storing highlights...");
    console.log(selection);

    const { highlights } = await chrome.storage.local.get({ highlights: {} });

    const location = host + pathname;
    if (!highlights[location]) highlights[location] = {};
    if (!highlights[location].selections) highlights[location].selections = [];

    highlights[location].selections.push({
        selection: selection.toString(),
        noteId: "note_id",
    });

    chrome.storage.local.set({ highlights: highlights }).then(() => {
        console.log(highlights);
    });
}

export async function storeNoteId(noteId, host, pathname) {
    console.log('Storing note id created for this location');
    console.log(noteId);

    const { highlights } = await chrome.storage.local.get({ highlights: {} });
    const location = host + pathname;
    if (!highlights[location]) highlights[location] = {};
    
    highlights[location].noteId = noteId;
    NOTE_ID_CURRENT_LOCATION = noteId;
}

export async function load(host, pathname) {
    const result = await chrome.storage.local.get({ highlights: {} });
    const location = host + pathname;
    
    NOTE_ID_CURRENT_LOCATION = result.highlights[location].noteId;

    return result.highlights[location] || [];
}

export function getLocationMetadata() {
    console.log(NOTE_ID_CURRENT_LOCATION);

    return ({
        noteId: NOTE_ID_CURRENT_LOCATION
    });
}
