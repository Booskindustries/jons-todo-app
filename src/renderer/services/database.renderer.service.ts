

type Task = {
    id?: number;
    title: string;
    description: string;
    due_date: string;
    status?: string;
  };
  
  export const databaseService = {
    addTask: async (task: Task): Promise<void> => {
      await (window as any).ipcAPI.invoke('add-task', task);
    },
  
    getTasks: async (): Promise<Task[]> => {
      return await (window as any).ipcAPI.invoke('get-tasks');
    },
  
    updateTaskStatus: async (id: number, status: string): Promise<void> => {
      await (window as any).ipcAPI.invoke('update-task-status', { id, status });
    },
  };