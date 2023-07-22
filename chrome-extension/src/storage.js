export async function store(selection, host, pathname) {
    console.log("Storing highlights...");
    console.log(selection);

    const { highlights } = await chrome.storage.local.get({ highlights: {} });

    const location = host + pathname;
    if (!highlights[location]) highlights[location] = [];

    highlights[location].push({
        selection: selection.toString(),
    });

    chrome.storage.local.set({ highlights: highlights }).then(() => {
        console.log(highlights);
    });
}

export async function load(host, pathname) {
    const result = await chrome.storage.local.get({ highlights: {} });
    const location = host + pathname;
    return result.highlights[location] || [];
}
