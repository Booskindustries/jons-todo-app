// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

// Expose a secure API to the renderer process
contextBridge.exposeInMainWorld('ipcAPI', {
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
  on: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.on(channel, listener),
  once: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.once(channel, listener),
  printHome: () => ipcRenderer.invoke('print-home'),
  saveAvatar:(filePath: string) => ipcRenderer.invoke('save-avatar',filePath),
});