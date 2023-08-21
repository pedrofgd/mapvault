import { cmdlineToogle, handleCmdlineKeydown } from './cmdline/index.js'
import { handleHighlightKeydown } from './highlight/index.js';

const Mode = {
    DISABLED: "disabled",
    HIGHLIGHT: "highlight",
    CMDLINE: "cmdline",
};

const ENABLE_FEATURES_COMMAND = "F6";

export function initState() {
    // Extension features are not exposed until user explicitly enable it.
    // It reduces use of multiple keydowns for a single action.
    return Mode.DISABLED;
}

// Keydown events are handled by the current mode
// or ignored if features disabled 
export async function handleKeydownEvent(event, mode) {
    const key = event.key;

    if (key === ENABLE_FEATURES_COMMAND) {
        return mode === Mode.DISABLED
            ? Mode.HIGHLIGHT
            : Mode.DISABLED;
    } else if (mode !== Mode.DISABLED && key === ":") {
        return toggleEnabledModes(mode);
    } else if (mode === Mode.HIGHLIGHT) {
        return await handleHighlightKeydown(event)
            ? Mode.HIGHLIGHT
            : Mode.DISABLED;
    } else if (mode === Mode.CMDLINE) {
        return await handleCmdlineKeydown(event)
            ? Mode.CMDLINE
            : Mode.HIGHLIGHT;
    } else {
        return Mode.DISABLED;
    }
}

function toggleEnabledModes(mode) {
    const currIsCmdline = mode === Mode.CMDLINE;
    if (currIsCmdline) mode = Mode.HIGHLIGHT;
    else mode = Mode.CMDLINE;

    cmdlineToogle(!currIsCmdline);
    return mode;
}
