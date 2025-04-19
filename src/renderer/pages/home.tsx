/* eslint-disable import/no-unresolved */
import React from 'react';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskItem from '@/components/Taskitem';

const Homepage = () => {

  const [tasks, setTasks] = React.useState([{ title: "Task 1", body: "This is the first task." }]);

        const addTask = () => {
          const newTask = { title: `Task ${tasks.length + 1}`, body: `This is task number ${tasks.length + 1}.` };
          setTasks([...tasks, newTask]);
        };

  return (
    <div className="container mx-auto p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Home</h2>
        <p>This is a simple todo app built with Electron and React.</p>
        
        {tasks.map((task, index) => (
          <TaskItem key={index} title={task.title} body={task.body} />
        ))}

        <Button
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          onClick={addTask}
        >
          <PlusCircleIcon />
          <span>Add Task</span>
        </Button>
    </div>
  );
};

export default Homepage;