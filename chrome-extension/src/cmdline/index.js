import { mode, Mode } from "../index.js";
import { toggleMode } from "../index.js";
import { newCommand } from "./new.js";
import { remarkCommand } from "./remark.js";
import { useCommand } from "./use.js";

const CMDLINE_ID = "highlighter-cmdline";

// TODO: restrict access
let cmdlineEl = null;
let command = "";

export function cmdlineToogle(display) {
    if (display) {
        createCmdline();
    } else { // toggle cmdline view
        var cmdlineEl = document.getElementById(CMDLINE_ID);
        if (cmdlineEl) cmdlineEl.remove();
    }
}

export async function handleCmdlineKeydownTemp(event) {
    event.preventDefault();

    const key = event.key;
    const keyAction = key.length === 1 ? "Char" : key;
    
    const acceptedKeys = {
        Enter(_) { processCommand() },
        Backspace(_) { backspaceCommandChar() },
        Meta(_) { leaveCmdlineMode() },
        Escape(_) { leaveCmdlineMode() },
        Char(key) { command += key }
    }

    const processor = acceptedKeys[keyAction];
    if (processor) {
        await processor(key);
    }

    if (mode === Mode.CMDLINE)
        displayContent(command);
}

function backspaceCommandChar() {
    if (command === "") {
        toggleMode();
        return;
    }
    command = command.slice(0, -1);
}

function leaveCmdlineMode() {
    command = "";
    toggleMode();
}

function createCmdline() {
    cmdlineEl = document.createElement("div");

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

function displayContent(content) {
    if (cmdlineEl) {
        cmdlineEl.innerHTML = ':' + content;
    }
}

async function processCommand() {
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

    const acceptedCommands = {
        async new(arg) { await newCommand(arg) },
        async rk(arg) { await remarkCommand(arg) },
        async use(arg) { await useCommand(arg) }
    };
    
    const argument = command.slice(i+1, command.length);
    const processor = acceptedCommands[token];
    if (processor) {
        await processor(argument);
        displayContent("Done");
        await delayAsync(500);
        leaveCmdlineMode();
    } else {
        alert("Erro: comando não existe");
    }
}

async function delayAsync(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
