import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '../services/database.renderer.service';
import { toast } from 'sonner';
import { Task } from '@/lib/types';


/**
* TaskContextType defines the shape of the context value that will be provided to components.
* It includes the tasks array, functions to set tasks, add a new task, and update an existing task.
* It also includes the newTask and editTask state variables.
 */
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


/**
 * @param children - The children prop is the content that will be wrapped by the TaskProvider.
 * @returns A TaskProvider component that provides the task context to its children.
 * The TaskProvider component is a React functional component that uses the useState and useEffect 
 * hooks to manage the state of tasks and provide functions to add and update tasks.
 * It uses the TaskContext to provide the tasks and functions to its children components.
 * 
 * @returns {JSX.Element} - A React component that provides the task context to its children.
 *  
 */
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