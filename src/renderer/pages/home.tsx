/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { PlusCircleIcon, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskItem from '@/components/Taskitem';
import { databaseService } from '../services/database.renderer.service';
import { log } from 'electron-log';
import { Task } from '@/lib/types';
import { useTaskContext } from '../context/TaskContext';


const Homepage = () => {

  const { tasks, setTasks, newTask, setNewTask, handleAddTask } = useTaskContext();

  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]);

  const handleUpdateTask = (id:number, updatedTask:Task) => {
    log('Updating task with ID:', id, 'to:', updatedTask);
    databaseService.updateTask({ ...updatedTask, id }).then(() => {
      databaseService.getTasks().then(setTasks);
    });
  };

  const handleDeleteTask = (id:number) => {
    log('Deleting task with ID:', id);
    databaseService.deleteTask(id).then(() => {
      databaseService.getTasks().then(setTasks);
    });
  };

  return (
    <div className="container mx-auto p-4 full-width">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Home</h2>
        <p>This is a simple todo app built with Electron and React.</p>
        
        {tasks.map((task, index) => (
          <div className="flex items-center mb-2.5" key={`${index}-${task.id}`}>
            <TaskItem key={`${index}-${task.id}`} id={task.id} title={task.title} body={task.description} date={task.due_date} status={task.status} />
            <div className="flex items-center ml-auto">
              <Button
                variant='outline'
                className='mr-2'
                onClick={() => console.log('Edit task with ID:', task.id)}
              >
                <Pencil/>
              </Button>
              <Button
                variant='outline'
                className='hover:bg-red-500 hover:text-white'
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}

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
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
            console.log('Description:', e.target.value);
          }}
        />
        <Input
          type="date"
          value={newTask.due_date}
          onChange={(e) => {
            setNewTask({ ...newTask, due_date: e.target.value });
            console.log('Due date:', e.target.value);
          }}
        />
        <Button onClick={handleAddTask}><PlusCircleIcon />Add Task</Button>
    </div>
  );
};

export default Homepage;