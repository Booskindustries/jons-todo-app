import React from "react";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/lib/types";

type AddTask = {
    newTask: Task;
    setNewTask: React.Dispatch<React.SetStateAction<Task>>;
    handleAddTask: () => void;
    handleCancel: () => void;
};


export function AddTask({newTask, setNewTask, handleAddTask, handleCancel} :Readonly<AddTask> ) {

return (
    <div>
        <Input
          type="text"
          className="mt-2"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <Input
          type="text"
          className="mt-2"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
            console.log('Description:', e.target.value);
          }}
        />
        <Input
          className="mt-2"
          type="date"
          value={newTask.due_date}
          onChange={(e) => {
            setNewTask({ ...newTask, due_date: e.target.value });
            console.log('Due date:', e.target.value);
          }}
        />
        <div className="flex mt-2 flex-row space-x-2 w-full items-start justify-start">
            
            <Button onClick={handleAddTask}><PlusCircleIcon />Add New Task</Button>
            <Button
                variant="outline"
                onClick={handleCancel}
            >
            Cancel
            </Button>
        </div>
    </div>
    );
}