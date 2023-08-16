import { createNote } from "../api.js";
import { host, pathname } from "./../index.js";
import { storeNoteId } from "../storage.js";

export async function newCommand(arg) {
    // TODO: parse arguments and flags
    const args = arg.split("--");
    const nameArgument = args[0];
    const aliasArgument = args[1];
    const alias = aliasArgument.split(" ")[1];
    console.log(alias);

    const note = await createNote(nameArgument, alias, location);
    storeNoteId(note.id, host, pathname);

    console.log(note);
}
