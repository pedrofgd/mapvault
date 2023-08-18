import { cmdlineToogle, displayCommand, processCommand } from './cmdline/index.js'
import { applyExistingHighlights, handleHighlightKeydown } from './highlight/index.js';
import { clearStorageForLocation } from './storage.js';

export const host = location.host;
export const pathname = location.pathname;

const Mode = {
    Highlight: "highlight",
    Cmdline: "cmdline",
};

let mode = Mode.Highlight;
let command = "";

async function handleCmdlineKeydown(event) {
    event.preventDefault();

    const key = event.key;
    switch (key) {
        case "Meta":
        case "Escape":
            toogleMode();
            break;
        case "Backspace":
            if (command === "") 
                toogleMode();
            command = command.slice(0, -1);
            break;
        case " ":
            command += " ";
            break;
        case "Enter":
            var err = await processCommand(command);
            if (err) {
                alert(err);
            } else {
                toogleMode();
            }
        // Ignored keys. TODO: review strategy

        case "Shift":
        case "Control":
        case "CapsLock":
        case "Delete":
        case "Alt":
        case "Tab":
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Dead":
        case "PageUp":
        case "PageDown":
            break;
        // Then, all other keys are the command input
        default:
            command += key;
            break;
    }

    // If still in CMDLINE mode, display it
    if (mode === Mode.Cmdline)
        displayCommand(command);
}

function toogleMode() {
    // TODO: refact for elegance
    const currIsCmdline = mode === Mode.Cmdline;
    if (currIsCmdline) {
        mode = Mode.Highlight;
        command = "";
    } else {
        mode = Mode.Cmdline;
    }
    cmdlineToogle(!currIsCmdline, command);
}

function handleKeydownEvent(event) {
    const key = event.key;
    if (key === ":") toogleMode();
    else if (key == "C") clearStorageForLocation();
    else if (mode === Mode.Highlight) handleHighlightKeydown(event);
    else if (mode === Mode.Cmdline) handleCmdlineKeydown(event);
}

export async function init() {
    document.addEventListener('keydown', async function(event) {
        handleKeydownEvent(event);
    });

    await applyExistingHighlights();
}
