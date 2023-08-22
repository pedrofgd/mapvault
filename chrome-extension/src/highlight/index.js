import { createRemark } from "../api.js";
import { storeHighlight, load, getLocationMetadata, clearStorageForLocation } from "../storage.js";

const HIGHLIGHT_DEFAULT_ID = "mapvault-highlight-span";

let actionKeysPressed = {};

export async function handleHighlightKeydown(event) {
    const key = event.key;
    registerActionKeyPressed(key);
    const keyAction = mapKeyAction(key);

    // TODO: being called for every keydown... refactor for create only once
    const acceptedActions = {
        async h() { return await highlightAndStoreSelection() },
        Escape() { return false; },
        // TODO: only for testing... remove at some point
        async C() { await clearStorageForLocation(); return true; }
    };

    const processor = acceptedActions[keyAction];
    if (processor) {
        const continueInMode = await processor();
        if (!continueInMode) return false;
    }

    return true;
}

export async function applyExistingHighlights() {
    const highlights = await load();
    if (highlights?.selections) {
        highlights.selections.forEach((selection) => {
            const serializedRange = selection.serializedRange;
            const range = deserializeRange(serializedRange); 
            applyHighlightStyle(range);
        });
    }
}

function registerActionKeyPressed(key) {
    if (key.length !== 1) {
        actionKeysPressed[key] = true;
        setTimeout(() => {actionKeysPressed = {}}, 500);
    }
}

function mapKeyAction(key) {
    // TODO: will handle multiple keys for action here
    return key;
}

async function highlightAndStoreSelection() {
    const selection = window.getSelection();
    const selectedContent = selection.toString();
    if (selectedContent === '')
        return true;

    const locationMetadata = getLocationMetadata();
    if (!locationMetadata.noteId) {
        alert("Erro: crie ou use uma nota primeiro");
        return true; // Continue in highlight mode
    }

    const selectedRange = selection.getRangeAt(0);
    const serializedRange = serializeRange(selectedRange);
    await storeHighlight(serializedRange);

    applyHighlightStyle(selectedRange);

    await createRemark(`highlight: ${selectedContent}`,
        locationMetadata.noteId);

    return true;
}

function applyHighlightStyle(range) {
    const span = document.createElement("span");
    span.setAttribute("id", HIGHLIGHT_DEFAULT_ID);
    span.appendChild(range.extractContents());
    range.insertNode(span);
}

function serializeRange(selectedRange) {
    const startContainerPath = getPathFromNode(selectedRange.startContainer);
    const endContainerPath = getPathFromNode(selectedRange.endContainer);

    return JSON.stringify({
        startContainerPath,
        startOffset: selectedRange.startOffset,
        endContainerPath,
        endOffset: selectedRange.endOffset
    });
}

function deserializeRange(serializedRange) {
    const { 
        startContainerPath, 
        startOffset, 
        endContainerPath,
        endOffset
    } = JSON.parse(serializedRange);
    
    const startContainer = getNodeFromPath(startContainerPath);
    const endContainer = getNodeFromPath(endContainerPath);

    const range = new Range();
    range.setStart(startContainer, startOffset);
    range.setEnd(endContainer, endOffset);

    return range;
}

function getPathFromNode(node) {
    const path = [];
    while (node != document.body) {
        let segment = {
            tag: node.nodeName.toLowerCase(),
            id: node.id ?? null,
            className: node.className ?? null,
            index: Array.prototype.indexOf.call(node.parentNode.childNodes, node)
        };

        // insert in front of path
        path.unshift(segment);
        node = node.parentNode;
    }

    return path;
}

function getNodeFromPath(path) {
    let node = document.body;

    path.forEach((segment) => {
        const tag = segment.tag;
        const id = segment.id;
        const className = segment.className;

        let foundNode = null;
        if (tag === "#text") {
            const childNodes = node.childNodes;
            foundNode = childNodes[segment.index];
        } else if (id) {
            foundNode = node.querySelector(`${tag}#${id}`);
        } else if (className) {
            foundNode = node.querySelector(`${tag}.${className}`);
        } else {
            foundNode = node.childNodes[segment.index];
        }

        if (!foundNode) {
            const jsonSegment = JSON.stringify(segment);
            console.log(`node not found for segment: ${jsonSegment}`);
            return null;
        }

        node = foundNode;
    })

    return node;
}
