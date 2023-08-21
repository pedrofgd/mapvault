import { createNote } from "../api.js";
import { host, pathname } from "./../index.js";
import { storeNoteId } from "../storage.js";

export async function newCommand(arg) {
    const args = arg.split("-");
    const nameArgument = args[0];

    const parsedArguments = parseArguments(args.slice(1));

    // argument/flag check
    const alias = parsedArguments["a"] ?? null;
    const setNewAsDefault = "n" in parsedArguments ? false : true;

    const note = await createNote(nameArgument, alias, location);
    if (setNewAsDefault) {
        storeNoteId(note.id, host, pathname);
    }

    console.log(note);
}

function parseArguments(args) {
    let parsedArgs = {};
    for (let i = 0; i < args.length; i++) {
        const segments = args[i].split(/\s(.*)/s);
        const argName = segments[0].trim();
        parsedArgs[argName] = segments[1];
    }

    return parsedArgs;
}
