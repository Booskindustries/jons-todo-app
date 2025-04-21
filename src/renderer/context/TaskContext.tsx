import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../services/database.renderer.service';
import { toast } from 'sonner';
import { Task } from '@/lib/types';

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  handleAddTask: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '', due_date: '' });

  // Fetch tasks from the database when the component mounts
  useEffect(() => {
    databaseService.getTasks().then(setTasks);
  }, []);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.due_date) {
      console.error('Title and Due Date are required.');
      return;
    }

    databaseService.addTask(newTask).then(() => {
      // Refresh the tasks after adding a new one
      databaseService.getTasks().then(setTasks);
      setNewTask({ title: '', description: '', due_date: '' });
      toast.success(`Task "${newTask.title}" added successfully!`, {
        duration: 2000,
        description: `You have added the task "${newTask.title}".`,
        action: {
            label: "Undo",
            onClick: () => {
                setNewTask({ title: '', description: '', due_date: '' });
                toast.dismiss();
            },
        },
    });
    });
  };

  const contextValue = React.useMemo(
    () => ({ tasks, setTasks, newTask, setNewTask, handleAddTask }),
    [tasks, newTask, handleAddTask]
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};