import { storeHighlight, load } from './storage.js'
import { cmdlineToogle, displayCommand, processCommand } from './cmdline/index.js'

export const host = location.host;
export const pathname = location.pathname;

const Mode = {
    Highlight: "highlight",
    Cmdline: "cmdline",
};

let mode = Mode.Highlight;
let command = "";

async function highlightAndStore() {
  let selection = window.getSelection().getRangeAt(0);

  let content = document.createElement("span");
  content.setAttribute("style", 
    "background-color: yellow; " + 
    "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;");

  selection.surroundContents(content);

  await storeHighlight(selection, host, pathname); 
}

async function applyExistingHighlights() {
    console.log('Loading highlights in this page');
    
    const data = await load(host, pathname);
    console.log(data);

    // TODO: fix apply highlights to page
    return;

    let pageContent = document.body.innerHTML;

    data.forEach(function(html) {
        let tempElement = document.createElement('div');
        let content = tempElement.firstChild.innerHTML;
        tempElement.innerHTML = html;

        let regex = new RegExp(content, 'g');
        pageContent = pageContent.replace(regex, html);
    });

    document.body.innerHTML = pageContent;
}

function handleHighlighKeydown(event) {
    const key = event.key;
    switch (key) {
        case "h":
            highlightAndStore();
            break;
    }
}

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
    else if (mode === Mode.Highlight) handleHighlighKeydown(event);
    else if (mode === Mode.Cmdline) handleCmdlineKeydown(event);
}

export async function init() {
    document.addEventListener('keydown', async function(event) {
        handleKeydownEvent(event);
    });

    await applyExistingHighlights();
}
