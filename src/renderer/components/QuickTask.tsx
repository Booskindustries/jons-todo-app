import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskContext } from "../context/TaskContext";
import { Datepicker } from "./Datepicker";

export function QuickTask() {

const { newTask, setNewTask, handleAddTask } = useTaskContext();
const [isDialogOpen, setIsDialogOpen] = useState(false);


const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setNewTask({ ...newTask, due_date: date.toISOString().split("T")[0] }); // Format date as YYYY-MM-DD
    }
  };


/** 
* Handles the addition of a new task from a dialog box.
* It sets the new task's properties based on user input and closes the dialog after adding the task.
* 
* @component QuickTask
* @returns {JSX.Element} - A React component that renders a button to open a dialog for creating a new task.
 */
//TODO: tempeted to just use the add task component here instead of duplicating code
return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <SidebarMenuButton
                onClick={() => console.log("Quick Create Task")}
                tooltip="Quick Create Task"
                className="cursor-pointer min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
                <PlusCircleIcon />
                <span>Quick Create Task</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                    Create a new task.
                </DialogDescription>
            </DialogHeader>

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
                }}
            />
            <Datepicker value={newTask.due_date ? new Date(newTask.due_date) : undefined} onChange={handleDateChange} />

            <Button
                onClick={() => {
                    handleAddTask();
                    setIsDialogOpen(false); // Close the dialog after adding the task
                }}
            >
                <PlusCircleIcon />Add Task
            </Button>
        </DialogContent>
    </Dialog>
);
}