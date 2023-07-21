// Use dynamic import as work-around for use JS modules
(async() => {
    const src = chrome.runtime.getURL("src/index.js");
    const contentMain = await import(src);
    await contentMain.init();
})();
