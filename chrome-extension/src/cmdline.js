const cmdlineId = "highlighter-cmdline";

export function cmdline(display) {

    if (display) {
        createCmdLine();
    } else { // toggle cmdline view
        var cmdlineEl = document.getElementById(cmdlineId);
        if (cmdlineEl) cmdlineEl.remove();
    }

}

function createCmdLine() {

    var cmdlineEl = document.createElement("div");

    cmdlineEl.innerHTML = ":";
    cmdlineEl.setAttribute("style", 
        "position: fixed; " +
        "left: 0; bottom: 0; " +
        "width: 100%; " + 
        "background-color: black; color: white; " +
        "padding: 3px 0px 3px 3px; " +
        "font-family: 'SF Mono'; font-size: 9px; " +
        "z-index: 5432;");
    cmdlineEl.setAttribute("id", cmdlineId);

    document.body.appendChild(cmdlineEl);

}

export function displayCommand(command) {
    var cmdlineEl = document.getElementById(cmdlineId);
    cmdlineEl.innerHTML = ':' + command;
}

export function processCommand(command) {
    // TODO: start with new command that receives an argument for name of a note    
}
