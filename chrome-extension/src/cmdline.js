import { createNote } from "./api.js";

const cmdlineId = "highlighter-cmdline";

export function cmdlineToogle(display) {

    if (display) {
        createCmdline();
    } else { // toggle cmdline view
        var cmdlineEl = document.getElementById(cmdlineId);
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
        "background-color: black; color: white; " +
        "padding: 3px 0px 3px 3px; " +
        "font-family: 'Fira Code'; font-size: 9px; " +
        "z-index: 5432;");
    cmdlineEl.setAttribute("id", cmdlineId);

    document.body.appendChild(cmdlineEl);

}

export function displayCommand(command) {
    var cmdlineEl = document.getElementById(cmdlineId);
    cmdlineEl.innerHTML = ':' + command;
}

export async function processCommand(command, location) {
    console.log("processing command...");

    let i = 0;
    let token = "";
    while (i < command.length) {
        if (token !== "" && command[i] === " ") 
            break;

        while (command[i] !== " ") {
            token += command[i];
            i++;
        }
    }
    
    if (token === "new") {
        var nameArgument = command.slice(i+1, command.length);
        await createNote(nameArgument, location);
    } else {
        return "Erro: comando não existe";
    }
}
