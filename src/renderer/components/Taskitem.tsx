import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { databaseService } from '../services/task.renderer.service';
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Task } from "@/lib/types";
import { useTaskContext } from '../context/TaskContext';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

// Added date prop for a time to finish task
interface TaskItemProps {
    task: Task;
    index: number;
    handleEditTask: (task: Task, index: number) => void;
}


/**
 * TaskItem component represents a single task item in the task list.
 * It displays the task title, body, and due date, and allows the user to check/uncheck the task.
 * @param {TaskItemProps} props - The properties for the TaskItem component.
 * @returns {JSX.Element} - A React component that represents a task item.
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, index, handleEditTask}) => {
    const { setTasks } = useTaskContext();

    const [checked, setChecked] = React.useState(task.status === "completed");

    const handleDeleteTask = (id:number) => {
        databaseService.deleteTask(id).then(() => {
          databaseService.getTasks().then(setTasks);
        });
      };

    const handleDatabaseUpdate = (id:number, status:string) => {
        databaseService.updateTaskStatus(id, status).then(() => {
          databaseService.getTasks().then(setTasks);
            }
        );
    } 

    //TODO: need the undo function to update the database so the component updates with the status being corrected
    const handleCheckboxClick = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        handleDatabaseUpdate(task.id, newCheckedState ? "completed" : "pending");
        
        toast(`Task "${task.title}" ${newCheckedState ? "checked" : "unchecked"}`, {
            duration: 2000,
            description: `You have ${newCheckedState ? "checked" : "unchecked"} the task "${task.title}".`,
            action: {
                label: "Undo",
                onClick: () => {
                    handleDatabaseUpdate(task.id, !newCheckedState ? "pending" : "completed");
                    setChecked(!newCheckedState);
                    toast.dismiss();
                },
            },
        });
    };
      

    return (
        <>
        <div className="flex items-center mb-2.5">
            <Checkbox className="mr-2.5 cursor-pointer" checked={checked} onClick={handleCheckboxClick} />
            <div>
                <h3 className="m-0 text-base font-medium">{task.title}</h3>
                <p className="m-0 text-sm text-gray-600">{task.description}</p>
                {task.due_date && (
                    <p
                        className={`m-0 text-sm ${
                            new Date(task.due_date) < new Date() ? "text-red-400" : "text-gray-600"
                        }`}
                    >
                        {`Due: ${task.due_date}`}
                    </p>
                )}
            </div>
        </div>
            <div className="flex items-right ml-auto">
                <TooltipProvider delayDuration={1}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                className='mr-2 cursor-pointer transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
                                onClick={() => handleEditTask(task,index)}
                            >
                                <Pencil />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Edit Task</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                className='cursor-pointer transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white '
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <Trash2 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Task</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
        </>
    );
};

export default TaskItem;

