import { initState, handleKeydownEvent } from './state.js';
import { applyExistingHighlights } from "./highlight/index.js";

export const host = location.host;
export const pathname = location.pathname;

export async function init() {
    let mode = initState();
    document.addEventListener('keydown', async function(event) {
        mode = await handleKeydownEvent(event, mode);
    });

    await applyExistingHighlights();
}
