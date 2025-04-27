/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import TaskItem from '@/components/Taskitem';
import { Task } from '@/lib/types';
import { useTaskContext } from '../context/TaskContext';
import { EditTask } from '@/components/EditTask';
import { AddTask } from '@/components/AddTask';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const Homepage = () => {
  const [edit, setEdit] = React.useState<number>(-1);
  const [showAddTask, setShowAddTask] = React.useState<boolean>(false);
  const { tasks, newTask, setNewTask, editTask, setEditTask, handleAddTask , handleUpdateTask} = useTaskContext();

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

  const handleAddTaskAndHide = () => {
    handleAddTask();
    setShowAddTask(false); // Hide the Add Task component after adding a task
  };

  const handleCancelAddTask = () => {
    setShowAddTask(false); // Hide the Add Task component without adding a task
    setNewTask({ title: '', description: '', due_date: '' }); // Reset the new task state
  };

  const handleAddNewTask = () => {
    setShowAddTask(true); // Show the Add Task component
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);
  }

  return (
    <div id="home" className="container mx-auto p-4 full-width">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Home</h2>
        
        {tasks.filter(task => task.status != 'completed').length > 0 ? (
              tasks.filter(task => task.status != 'completed').map((task, index) => (
        
            <div
              className="flex items-center mb-2.5 p-2 rounded-md border border-transparent transition duration-300 ease-in-out hover:border-gray-300"
              style={{ boxSizing: 'border-box', borderWidth: '2px' }}
              key={`${index}-${task.id}`}
            >
            {edit !== index ? (
              <TaskItem key={`${index}-${task.id}`} task={task} index={index} handleEditTask={handleEditTask} />
            ) : (
              <EditTask id={task.id} editTask={editTask} setEditTask={setEditTask} handleLocalEditTask={handleLocalEditTask} />
            )}
            </div>
        ))) : (
          <p>No tasks available</p>
        )}

       {/* Hoverable button to reveal Add Task */}
      {!showAddTask && (
        <Button
          variant="ghost"
          onClick={() => handleAddNewTask()}
        >
          + Add a new task
        </Button>
      )}

      {/* Add Task Component */}
      {showAddTask && (
        <div className="mt-4">
          <AddTask newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTaskAndHide} handleCancel={handleCancelAddTask} />
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="completed">
          <AccordionTrigger className="text-2xl">Completed tasks</AccordionTrigger> 
          <Separator />
          <AccordionContent>
            {tasks.filter(task => task.status === 'completed').length > 0 ? (
              tasks.filter(task => task.status === 'completed').map((task, index) => (
                <div
                  className="flex items-center mb-2.5 p-2 rounded-md border border-transparent transition duration-300 ease-in-out hover:border-gray-300"
                  style={{ boxSizing: 'border-box', borderWidth: '2px' }}
                  key={`${index}-${task.id}`}
                >
                  <TaskItem key={`${index}-${task.id}`} task={task} index={index} handleEditTask={handleEditTask} />
                </div>
              ))
            ) : (
              <p>No completed tasks</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </div>
  );
};

export default Homepage;