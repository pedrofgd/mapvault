import { createNote, createRemark } from "./api.js";
import { host, pathname } from "./index.js";
import { getLocationMetadata, storeNoteId } from "./storage.js";

const CMDLINE_ID = "highlighter-cmdline";

export function cmdlineToogle(display) {
    if (display) {
        createCmdline();
    } else { // toggle cmdline view
        var cmdlineEl = document.getElementById(CMDLINE_ID);
        if (cmdlineEl) cmdlineEl.remove();
    }
}

function createCmdline() {
    var cmdlineEl = document.createElement("div");

    cmdlineEl.innerHTML = ":";
    cmdlineEl.setAttribute("style", 
        "position: fixed; " +
        "left: 0; bottom: 0; " +
        "width: 100%; " + 
        "background-color: #3b3947; color: white; " +
        "padding: 3px 0px 3px 3px; " +
        "font-family: 'Fira Code'; font-size: 1rem; " +
        "z-index: 5432;");
    cmdlineEl.setAttribute("id", CMDLINE_ID);
    //TODO: blink cursor block (#F4B77D)

    document.body.appendChild(cmdlineEl);
}

export function displayCommand(command) {
    var cmdlineEl = document.getElementById(CMDLINE_ID);
    cmdlineEl.innerHTML = ':' + command;
}

export async function processCommand(command, location) {
    let i = 0;
    let token = "";
    // identity command
    while (i < command.length) {
        if (token !== "" && command[i] === " ")
            break;

        if (command[i] !== " ") {
            token += command[i];
            i++;
        }
    }
    
    if (token === "new") {
        // TODO: parse arguments and flags
        const nameArgument = command.slice(i+1, command.length);
        const note = await createNote(nameArgument, location);
        storeNoteId(note.id, host, pathname);
        console.log(note);
    } else if (token === "rk") {
        const argument = command.slice(i+1, command.length);
        
        const locationMetadata = getLocationMetadata();
        if (!locationMetadata.noteId) return "Erro: crie uma nova primeiro";

        await createRemark(argument, locationMetadata.noteId);
        console.log('remark argument: ', argument);
    } else {
        console.log("erro");
        return "Erro: comando não existe";
    }
}