import { ipcMain } from 'electron';
import { addTask, getTasks, deleteTask, updateTask, updateTaskStatus } from '../database/database';

class DatabaseService {
  constructor() {
    this.registerIpcHandlers();
  }

  public registerIpcHandlers() {
    ipcMain.handle('add-task', (event, task) => {
      addTask(task.title, task.description, task.dueDate);
    });

    ipcMain.handle('get-tasks', () => {
      return getTasks();
    });

    ipcMain.handle('delete-task', (event, id) => {
      deleteTask(id);
    });

    ipcMain.handle('update-task', (event, { id, title, description, dueDate }) => {
      updateTask(id, title, description, dueDate);
    });

    ipcMain.handle('update-task-status', (event, { id, status }) => {
      updateTaskStatus(id, status);
    });
  }
}

export default DatabaseService;