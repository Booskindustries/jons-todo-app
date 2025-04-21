import React from "react";


export type TaskImportProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
}


export type Task = {
    id?: number;
    title: string;
    description: string;
    due_date: string;
    status?: string;
  };