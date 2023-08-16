import { getNoteByAlias } from "../api.js";
import { storeNoteId } from "../storage.js";

export async function useCommand(arg) {
    console.log("use argument: ", arg);

    const note = await getNoteByAlias(arg);
    await storeNoteId(note.id);
}
