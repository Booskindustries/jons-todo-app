import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../services/database.renderer.service';
import { toast } from 'sonner';
import { Task } from '@/lib/types';

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  editTask: Task | null;
  setEditTask: React.Dispatch<React.SetStateAction<Task | null>>;
  handleAddTask: () => void;
  handleUpdateTask: (id:number, updatedTask:Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '', due_date: '' });
  const [editTask, setEditTask] = useState<Task | null>(null);

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

  const handleUpdateTask = (id:number, updatedTask:Task) => {
      console.log('Updating task with ID:', id, 'to:', updatedTask);
      databaseService.updateTask(id, updatedTask).then(() => {
        databaseService.getTasks().then(setTasks);
      });
      setEditTask(null);
    };
  
  

  const contextValue = React.useMemo(
    () => ({ tasks, setTasks, newTask, editTask, setEditTask, setNewTask, handleAddTask, handleUpdateTask }),
    [tasks, newTask, editTask, handleUpdateTask, handleAddTask]
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