import { store, load as load } from './storage.js'
import { cmdlineToogle, displayCommand, processCommand } from './cmdline.js'

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
    
    const data = await load(host, pathname);
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

const Mode = {
    Highlight: "highlight",
    Cmdline: "cmdline",
};

export async function init() {
    let mode = Mode.Highlight;

    let command = "";
    document.addEventListener('keydown', async function(event) {
        if (event.key === ":") {
            const currIsCmdline = mode === Mode.Cmdline;
            if (currIsCmdline) {
                mode = Mode.Highlight;
                command = '';
            } else {
                mode = Mode.Cmdline;
            }
            cmdlineToogle(!currIsCmdline);
        } else {
            if (mode === Mode.Highlight) {
                highlightAndStore()
            } else if (mode === Mode.Cmdline) {
                if (event.key === "Backspace") {
                    command = command.slice(0, -1);
                } else if (event.key === " ") {
                    event.preventDefault();
                    command = command += " ";
                } else if (event.key === "Enter") {
                    var err = await processCommand(command, host + pathname);
                    if (err) {
                        alert(err);
                    } else {
                        mode = Mode.Highlight;
                        cmdlineToogle(false);
                        command = '';
                    }
                } else { // TODO: ignore control keys (Meta, Shift, Control...)
                    command += event.key;
                }

                displayCommand(command);
            }
        }

    });
    await applyExistingHighlights();
}
