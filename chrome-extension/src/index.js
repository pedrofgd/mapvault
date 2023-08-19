import { cmdlineToogle, displayCommand, processCommand } from './cmdline/index.js'
import { applyExistingHighlights, handleHighlightKeydown } from './highlight/index.js';
import { clearStorageForLocation } from './storage.js';

export const host = location.host;
export const pathname = location.pathname;

const Mode = {
    HIGHLIGHT: "highlight",
    CMDLINE: "cmdline",
};

let mode = Mode.HIGHLIGHT;
let command = "";

async function handleCmdlineKeydown(event) {
    event.preventDefault();

    const key = event.key;
    switch (key) {
        case "Meta":
        case "Escape":
            // TODO: consider Observer Pattern for use it in cmdline/index.js
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
                // TODO: consider Observer Pattern for use it in cmdline/index.js
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
    if (mode === Mode.CMDLINE)
        displayCommand(command);
}

function toogleMode() {
    // TODO: refact for elegance (consider proper Strategy Pattern)
    const currIsCmdline = mode === Mode.CMDLINE;
    if (currIsCmdline) {
        mode = Mode.HIGHLIGHT;
        command = "";
    } else {
        mode = Mode.CMDLINE;
    }
    cmdlineToogle(!currIsCmdline, command);
}

function handleKeydownEvent(event) {
    const key = event.key;
    if (key === ":") toogleMode();
    else if (key == "C") clearStorageForLocation();
    else if (mode === Mode.HIGHLIGHT) handleHighlightKeydown(event);
    else if (mode === Mode.CMDLINE) handleCmdlineKeydown(event);
}

export async function init() {
    document.addEventListener('keydown', async function(event) {
        handleKeydownEvent(event);
    });

    await applyExistingHighlights();
}
