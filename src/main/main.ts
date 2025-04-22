import { app, BrowserWindow } from 'electron';
import { updateElectronApp } from 'update-electron-app';
import log from 'electron-log';
import  DatabaseService  from './services/database.service';
import { registerPrintService } from './services/print.service';

// Automatically check for updates
updateElectronApp({
  updateInterval: '30 minutes', // Check for updates every 5mins
  logger: log, // Log update events to the console
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

// Initialize the database service
const databaseService = new DatabaseService();
log.info('DatabaseService initialized:', databaseService);

registerPrintService();
log.info('Print service registered');

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    icon: '../icon/todolisticon.png',
    titleBarStyle: 'default',
    titleBarOverlay: true,
    frame: true,
    //autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  log.info('Main window loaded:', MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});