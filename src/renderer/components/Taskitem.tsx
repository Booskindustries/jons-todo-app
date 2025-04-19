import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";


// Added date prop for a time to finish task
interface TaskItemProps {
    title: string;
    body: string;
    date?: string; // Optional date prop
}

const TaskItem: React.FC<TaskItemProps> = ({ title, body, date }) => {
    const [checked, setChecked] = React.useState(false);

    const handleCheckboxClick = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
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
        <div className="flex items-center mb-2.5">
            <Checkbox className="mr-2.5" checked={checked} onClick={handleCheckboxClick} />
            <div>
                <h3 className="m-0 text-base font-medium">{title}</h3>
                <p className="m-0 text-sm text-gray-600">{body}</p>
            </div>
        </div>
    );
};

export default TaskItem;

