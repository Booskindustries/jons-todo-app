import React from 'react';
import Calendar from "@/components/Calendar";
import { useTaskContext } from "@/context/TaskContext"; // Adjust the import path as necessary

const CalendarPage = () => {
  const { tasks } = useTaskContext(); // Assuming you have a context to get tasks
  return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <Calendar tasks={tasks}/>
        </div> 
  );
};

export default CalendarPage;