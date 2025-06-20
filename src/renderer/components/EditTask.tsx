import React from "react";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/lib/types";
import { Datepicker } from "./Datepicker";

type EditTask = {
    editTask :Task
    setEditTask: React.Dispatch<React.SetStateAction<Task>>;
    handleLocalEditTask: (id: number, updatedTask: Task) => void;
    id?: number;
}


export function EditTask({editTask, setEditTask, handleLocalEditTask, id} : Readonly<EditTask>) {

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
          setEditTask({ ...editTask, due_date: date.toISOString().split("T")[0] }); // Format date as YYYY-MM-DD
        }
      };
    return (
        <div className="flex flex-col space-y-2 w-full align-items-center justify-center">
            <Input
                type="text"
                placeholder="Title"
                className=" w-full"
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

            <Datepicker value={editTask.due_date ? new Date(editTask.due_date) : undefined} onChange={handleDateChange} />
            <Button onClick={() => handleLocalEditTask(id, editTask)} className='cursor-pointer'>
                <PlusCircleIcon />Update Task
            </Button>
        </div>
    );
}