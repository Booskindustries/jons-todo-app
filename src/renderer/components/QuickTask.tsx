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
import { databaseService } from '../services/database.renderer.service';
import { toast } from "sonner";




export function QuickTask() {

const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
const [isDialogOpen, setIsDialogOpen] = useState(false);

const handleAddTask = () => {
    databaseService.addTask(newTask).then(() => {
        databaseService.getTasks().then(setTasks);
        setNewTask({ title: '', description: '', due_date: '' });
    });
    toast.success(`Task "${newTask.title}" added successfully!`, {
        duration: 2000,
        description: `You have added the task "${newTask.title}".`,
        action: {
            label: "Undo",
            onClick: () => {
                setNewTask({ title: '', description: '', due_date: '' });
                toast.dismiss();
            },
        },
    });
};

return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <SidebarMenuButton
                onClick={() => console.log("Quick Create Task")}
                tooltip="Quick Create Task"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
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
            <Input
                type="date"
                value={newTask.due_date}
                onChange={(e) => {
                    setNewTask({ ...newTask, due_date: e.target.value });
                    console.log('Due date:', e.target.value);
                }}
            />
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