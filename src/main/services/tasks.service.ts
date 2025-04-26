import { ipcMain } from 'electron';
import { addTask, getTasks, deleteTask, updateTask, updateTaskStatus } from '../database/tasks.database';

class TaskService {
  constructor() {
    this.registerIpcHandlers();
  }

  public registerIpcHandlers() {
    ipcMain.handle('add-task', (event, task) => {  
      addTask(task.title, task.description, task.due_date);
    });

    ipcMain.handle('get-tasks', () => {
      return getTasks();
    });

    ipcMain.handle('delete-task', (event, id) => {
      deleteTask(id);
    });

    ipcMain.handle('update-task', (event, id, task) => {
      updateTask(id, task.title, task.description, task.due_date);
    });

    ipcMain.handle('update-task-status', (event, { id, status }) => {
      updateTaskStatus(id, status);
    });
  }
}

export default TaskService;