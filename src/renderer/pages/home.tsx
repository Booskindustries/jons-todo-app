/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskItem from '@/components/Taskitem';
import { databaseService } from '../services/database.renderer.service';
import { log } from 'electron-log';

const Homepage = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });

  useEffect(() => {
    databaseService.getTasks().then(setTasks);
  }, []);

  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]);

  const addTask = () => {
    const newTask = { title: `Task ${tasks.length + 1}`, body: `This is task number ${tasks.length + 1}.`, due_date: '' };
    setTasks([...tasks, newTask]);
  };

  const handleAddTask = () => {
    log('Adding task:', newTask);
    databaseService.addTask(newTask).then(() => {
      databaseService.getTasks().then(setTasks);
      setNewTask({ title: '', description: '', due_date: '' });
    });
  };

  return (
    <div className="container mx-auto p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Home</h2>
        <p>This is a simple todo app built with Electron and React.</p>
        
        {tasks.map((task, index) => (
          <TaskItem key={index} id={task.id} title={task.title} body={task.description} date={task.due_date} status={task.status} />
        ))}

        <Button
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          onClick={addTask}
        >
          <PlusCircleIcon />
          <span>Add Task</span>
        </Button>
        <Input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <Input
          type="date"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  );
};

export default Homepage;