import { newCommand } from "./new.js";
import { remarkCommand } from "./remark.js";
import { useCommand } from "./use.js";

const CMDLINE_ID = "mapvault-highlight-cmdline";
const CMDLINE_CONTENT_ID = "mapvault-highlight-cmdline-content";
const CURSOR_BASE_CLASS = "cursor";
const CURSOR_BLOCK_CLASS = "cursor-block";

// TODO: restrict access
let cmdlineEl = null;
let cmdlineContent = null;
let cursor = null;
let cursorPosition = 0;
let command = "";
let actionKeysPressed = {};

export function cmdlineToogle(display) {
    if (display) createCmdline();
    else endCmdlineMode();
}

export async function handleCmdlineKeydown(event) {
    event.preventDefault();

    const key = event.key;
    actionKeysPressed[event.key] = true;
    const keyAction = mapKeyAction(key);

    const acceptedActions = {
        async Enter(_) { return await processCommand() },
        Backspace(_) { return backspaceCommandChar() },
        Meta(_) { return endCmdlineMode(); },
        Escape(_) { return endCmdlineMode() },
        Char(key) { return addCharToCommand(key) },
    }

    const processor = acceptedActions[keyAction];
    if (processor) {
        const continueInMode = await processor(key);
        if (!continueInMode) { 
            return false;
        }
    }

    console.log(command);
    console.log(cursorPosition);
    displayContent(command);
    return true;
}

function mapKeyAction(key) {
    if (key.length === 1) {
        return "Char";
    } 

    return key;
}

function backspaceCommandChar() {
    if (command === "") {
        endCmdlineMode();
        return false; // Exit cmdline mode
    }

    command = command.slice(0, -1);
    cursorPosition--;

    return true;
}

function endCmdlineMode() {
    command = "";
    if (cmdlineEl != null) {
        cmdlineEl.remove();
        cmdlineEl = null;
    }
    return false;
}

function addCharToCommand(key) {
    command += key;
    cursorPosition++;
    return true;
}

function createCmdline() {
    cmdlineEl = document.createElement("div");

    cmdlineEl.setAttribute("style", 
        "display: flex; " + 
        "align-items: center; " +
        "position: fixed; " +
        "left: 0; bottom: 0; " +
        "width: 100%; " + 
        "background-color: #3b3947; color: white; " +
        "padding: 3px 0px 3px 3px; " +
        "font-family: 'Fira Code'; font-size: 1rem; " +
        "z-index: 5432;");
    cmdlineEl.setAttribute("id", CMDLINE_ID);

    cmdlineContent = document.createElement("span");
    cmdlineContent.setAttribute("id", CMDLINE_CONTENT_ID);
    cmdlineContent.innerHTML = ":";

    cursor = createCursor();
    cmdlineEl.appendChild(cmdlineContent);
    cmdlineEl.appendChild(cursor);
    document.body.appendChild(cmdlineEl);
}

function createCursor() {
    const cursor = document.createElement("span");
    cursor.classList.add(CURSOR_BASE_CLASS, CURSOR_BLOCK_CLASS);

    return cursor;
}

function displayContent(content) {
    if (cmdlineEl && cmdlineContent) {
        content = content.replaceAll(" ", "&nbsp;");
        cmdlineContent.innerHTML = ':' + content;
    }
}

async function processCommand() {
    const { token, argument } = parseCommand(command);

    const acceptedCommands = {
        async new(arg) { await newCommand(arg) },
        async rk(arg) { await remarkCommand(arg) },
        async use(arg) { await useCommand(arg) }
    };
    
    const processor = acceptedCommands[token];
    if (processor) {
        await processor(argument);
        displayContent("Done");
        await delayAsync(500);
        endCmdlineMode();
        return false; // Exit cmdline mode
    } else {
        alert("Erro: comando não existe");
        return true; // Continue
    }
}

function parseCommand(command) {
    // TODO: maybe just use regex for simplicity
    let i = 0;
    let token = "";
    while (i < command.length) {
        if (token !== "" && command[i] === " ")
            break;
        if (command[i] !== " ") {
            token += command[i];
            i++;
        }
    }
    const argument = command.slice(i+1, command.length);
    return { token, argument };
}

async function delayAsync(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
