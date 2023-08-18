import { storeHighlight, load } from "../storage.js";

export async function handleHighlightKeydown(event) {
    const acceptedKeys = {
        h() { highlightAndStoreSelection() },
    };

    const processor = acceptedKeys[event.key];
    if (processor) {
        await processor();
    }
}

export async function applyExistingHighlights() {
    const highlights = await load();
    if (highlights?.selections) {
        highlights.selections.forEach((selection) => {
            const serializedRange = selection.serializedRange;
            console.log(serializedRange);
            const range = deserializeRange(serializedRange);
            applyHighlightStyle(range);
        });
    }
}

async function highlightAndStoreSelection() {
    console.log("highlight and store");
    const selectedRange = window.getSelection().getRangeAt(0);
    const serializedRange = serializeRange(selectedRange);

    await storeHighlight(serializedRange);
    applyHighlightStyle(selectedRange);
}

function applyHighlightStyle(range) {
    const span = document.createElement("span");
    span.setAttribute("style", 
        "background-color: yellow; " + 
        "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;");

    range.surroundContents(span);
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
            className: node.className ?? null
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
            // TODO: fix how managing the selected content (this is not a node and throws an error when deserializing range)
            foundNode = node.textContent;
        } else if (id) {
            foundNode = node.querySelector(`${tag}#${id}`);
        } else if (className) {
            foundNode = node.querySelector(`${tag}.${className}`);
        } else {
            foundNode = node.querySelector(tag);
        }

        if (!foundNode) {
            console.log(`node not found for segment: ${JSON.stringify(segment)}`);
            return null;
        }

        console.log("found node: ", foundNode);
        node = foundNode;
    })

    return node;
}
