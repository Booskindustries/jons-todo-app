import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { databaseService } from '../services/database.renderer.service';


// Added date prop for a time to finish task
interface TaskItemProps {
    id: number;
    title: string;
    body: string;
    date?: string; // Optional date prop
    status: string; 
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, body, date, status }) => {
    const [checked, setChecked] = React.useState(status === "completed");

    const handleCheckboxClick = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);

        databaseService.updateTaskStatus(id, newCheckedState ? "completed" : "pending"); 
        toast(`Task "${title}" ${newCheckedState ? "checked" : "unchecked"}`, {
            duration: 2000,
            description: `You have ${newCheckedState ? "checked" : "unchecked"} the task "${title}".`,
            action: {
                label: "Undo",
                onClick: () => {
                    setChecked(!newCheckedState);
                    toast.dismiss();
                },
            },
        });
    };
      

    return (
        <div className="flex items-center mb-2.5 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition duration-200 ease-in-out">
            <Checkbox className="mr-2.5" checked={checked} onClick={handleCheckboxClick} />
            <div>
                <h3 className="m-0 text-base font-medium">{title}</h3>
                <p className="m-0 text-sm text-gray-600">{body}</p>
                {date && <p className="m-0 text-sm text-gray-600">{`Due Date: ${date}`}</p>}
            </div>
        </div>
    );
};

export default TaskItem;

