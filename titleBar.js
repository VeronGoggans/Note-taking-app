const { ipcRenderer } = require("electron")
const ipc = ipcRenderer;

// Event listeners for the custom title bar
document.querySelector('#minimize').addEventListener('click', () => {
    ipc.send('manualMinimize');
})

document.querySelector('#maximize').addEventListener('click', () => {
    ipc.send('manualMaximize');
})

document.querySelector('#close').addEventListener('click', () => {
    ipc.send('manualClose');
})

