import React from "react";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/lib/types";
import { Datepicker } from "./Datepicker";

type AddTask = {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  handleAddTask: () => void;
  handleCancel: () => void;
};

export function AddTask({
  newTask,
  setNewTask,
  handleAddTask,
  handleCancel,
}: Readonly<AddTask>) {
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setNewTask({ ...newTask, due_date: date.toISOString().split("T")[0] }); // Format date as YYYY-MM-DD
    }
  };

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
        className="mt-2 mb-2"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <Datepicker value={newTask.due_date ? new Date(newTask.due_date) : undefined} onChange={handleDateChange} />
      <div className="flex mt-2 flex-row space-x-2 w-full items-start justify-start">
        <Button onClick={handleAddTask}>
          <PlusCircleIcon />
          Add New Task
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}