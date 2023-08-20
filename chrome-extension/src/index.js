import { cmdlineToogle, handleCmdlineKeydownTemp } from './cmdline/index.js'
import { applyExistingHighlights, handleHighlightKeydown } from './highlight/index.js';
import { clearStorageForLocation } from './storage.js';

export const host = location.host;
export const pathname = location.pathname;

export const Mode = {
    HIGHLIGHT: "highlight",
    CMDLINE: "cmdline",
};

// TODO: restrict access
export let mode = Mode.HIGHLIGHT;

export function toggleMode() {
    // TODO: refact for elegance (consider proper Strategy Pattern)
    const currIsCmdline = mode === Mode.CMDLINE;
    if (currIsCmdline) {
        mode = Mode.HIGHLIGHT;
    } else {
        mode = Mode.CMDLINE;
    }
    cmdlineToogle(!currIsCmdline);
}

function handleKeydownEvent(event) {
    const key = event.key;
    if (key === ":") toggleMode();
    // TODO: only for testing... remove at some point
    else if (key === "C") clearStorageForLocation();
    else if (mode === Mode.HIGHLIGHT) handleHighlightKeydown(event);
    else if (mode === Mode.CMDLINE) handleCmdlineKeydownTemp(event);
}

export async function init() {
    document.addEventListener('keydown', async function(event) {
        handleKeydownEvent(event);
    });

    await applyExistingHighlights();
}
