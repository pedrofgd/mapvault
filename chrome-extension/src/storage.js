import { host, pathname } from "./index.js";

// TODO: not available after page refresh
let NOTE_ID_CURRENT_LOCATION = "";

export async function storeHighlight(serializedRange) {
    console.log("Storing highlights...");

    const { highlights } = await chrome.storage.local.get({ highlights: {} });

    const location = host + pathname;
    if (!highlights[location]) highlights[location] = {};
    if (!highlights[location].selections) highlights[location].selections = [];

    highlights[location].selections.push({
        serializedRange,
        // TODO: set corret node id (return error if not defined)
        // TODO: create temporary note in the future
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

export async function load() {
    const result = await chrome.storage.local.get({ highlights: {} });
    const location = host + pathname;
    
    if (result.highlights[location])
    {
        NOTE_ID_CURRENT_LOCATION = result.highlights[location].noteId;
    }

    return result.highlights[location] || [];
}

export function getLocationMetadata() {
    console.log(NOTE_ID_CURRENT_LOCATION);

    return ({
        noteId: NOTE_ID_CURRENT_LOCATION
    });
}

export async function clearStorageForLocation() {
    console.log("clear storage for location");

    const { highlights } = await chrome.storage.local.get({ highlights: {} });
    const location = host + pathname;
    highlights[location] = null;
    await chrome.storage.local.set({ highlights: highlights });
}
