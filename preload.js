import { ipcRenderer, contextBridge } from 'electron';

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    minimizeWindow: () => ipcRenderer.send('manualMinimize'),
    maximizeWindow: () => ipcRenderer.send('manualMaximize'),
    closeWindow: () => ipcRenderer.send('manualClose')
});