
import { Task } from '../lib/types';

  export const databaseService = {
    addTask: async (task: Task): Promise<void> => {
      console.log('Sending task to main process:', task); 
      await (window as any).ipcAPI.invoke('add-task', task);
    },
  
    getTasks: async (): Promise<Task[]> => {
      return await (window as any).ipcAPI.invoke('get-tasks');
    },

    deleteTask: async (id: number): Promise<void> => {
      await (window as any).ipcAPI.invoke('delete-task', id);
    },

    updateTask: async (id:number, task: Task): Promise<void> => {
      await (window as any).ipcAPI.invoke('update-task', id, task);
    },
  
    updateTaskStatus: async (id: number, status: string): Promise<void> => {
      await (window as any).ipcAPI.invoke('update-task-status', { id, status });
    },
  };