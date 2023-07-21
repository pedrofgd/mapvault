import { store, load as loadAll } from './storage.js'

const host = location.host;
const pathname = location.pathname;

async function highlightAndStore() {
  // Highlight
  let selection = window.getSelection().getRangeAt(0);

  let content = document.createElement("span");
  content.setAttribute("style", 
    "background-color: yellow; " + 
    "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;");

  selection.surroundContents(content);

  await store(selection, host, pathname); 
}

async function applyExistingHighlights() {
    console.log('Loading highlights in this page');
    
    const data = await loadAll(host, pathname);
    console.log(data);

    let pageContent = document.body.innerHTML;

    data.forEach(function(html) {
        let tempElement = document.createElement('div');
        let content = tempElement.firstChild.innerHTML;
        tempElement.innerHTML = html;

        let regex = new RegExp(content, 'g');
        pageContent = pageContent.replace(regex, html);
    });

    document.body.innerHTML = pageContent;
}

export async function init() {
    document.addEventListener('keypress', highlightAndStore);
    await applyExistingHighlights();
}
