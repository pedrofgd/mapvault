import { getLocationMetadata } from "../storage.js";
import { createRemark } from "../api.js";

export async function remarkCommand(arg) {
    console.log('remark argument: ', arg);
    
    const locationMetadata = getLocationMetadata();
    if (!locationMetadata.noteId) return "Erro: crie ou use uma nota primeiro";

    await createRemark(arg, locationMetadata.noteId);
}
