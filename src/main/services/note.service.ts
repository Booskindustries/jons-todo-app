import { ipcMain } from 'electron';
import { addNote, deleteNote, getNotes } from '../database/notes.database';

class TaskService {
  constructor() {
    this.registerIpcHandlers();
  }

  public registerIpcHandlers() {
    ipcMain.handle('add-note', (event, note) => {  
      addNote(note);
    });

    ipcMain.handle('get-notes', () => {
      return getNotes();
    });

    ipcMain.handle('delete-note', (event, id) => {
      deleteNote(id);
    });

  }
}

export default TaskService;