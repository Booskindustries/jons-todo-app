/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { PlusCircleIcon, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskItem from '@/components/Taskitem';
import { databaseService } from '../services/database.renderer.service';
import { Task } from '@/lib/types';
import { useTaskContext } from '../context/TaskContext';


const Homepage = () => {
  const [edit, setEdit] = React.useState<number>(-1);
  const { tasks, setTasks, newTask, setNewTask, editTask, setEditTask, handleAddTask , handleUpdateTask} = useTaskContext();

  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]);

  const handleLocalEditTask = (id:number, updatedTask:Task) => {
   handleUpdateTask(id, updatedTask);
   setEdit(-1);
  }

  const handleEditTask = (task:Task,index:number) => {
    setEdit(index);
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
  }

  const handleDeleteTask = (id:number) => {
    databaseService.deleteTask(id).then(() => {
      databaseService.getTasks().then(setTasks);
    });
  };

  return (
    <div id="home" className="container mx-auto p-4 full-width">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Home</h2>
        
        {tasks.map((task, index) => (
        
          <div className="flex items-center mb-2.5 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:border hover:border-gray-300" key={`${index}-${task.id}`}>
            {edit !== index ? (
              <>
              <TaskItem key={`${index}-${task.id}`} id={task.id} title={task.title} body={task.description} date={task.due_date} status={task.status} />
              <div className="flex items-center ml-auto">
                <Button
                variant='outline'
                className='mr-2 cursor-pointer transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
                onClick={() => handleEditTask(task,index)}
                >
                <Pencil />
                </Button>
                <Button
                variant='outline'
                className='cursor-pointer transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white '
                onClick={() => handleDeleteTask(task.id)}
                >
                <Trash2 />
                </Button>
              </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
              <Input
                type="text"
                placeholder="Title"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Description"
                value={editTask.description}
                onChange={(e) => {
                setEditTask({ ...editTask, description: e.target.value });
                }}
              />
              <Input
                type="date"
                value={editTask.due_date}
                onChange={(e) => {
                setEditTask({ ...editTask, due_date: e.target.value });
                }}
              />
              <Button onClick={() => handleLocalEditTask(task.id, editTask)} className='cursor-pointer'>
                <PlusCircleIcon />Update Task
              </Button>
              </div>
            )}
            </div>
        ))}
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Add Task</h2>
        {/* NEED TO CHANGE THIS TO ONLY RENDER WHEN THE USER PRESSES THE ADD TASK PART OF THE PAGE, ALSO CREATE COMPONENT THAT CAN BE USED AS AN ADD AND AN EDIT */ }
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
        <Button onClick={handleAddTask}><PlusCircleIcon />Add New Task</Button>
    </div>
  );
};

export default Homepage;