import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";


interface TaskItemProps {
    title: string;
    body: string;
}
//todo: add date prop for a time to finish task
const TaskItem: React.FC<TaskItemProps> = ({ title, body }) => {
    const [checked, setChecked] = React.useState(false);

    const handleCheckboxClick = () => {
        setChecked(!checked);
        toast(`Task "${title}" ${checked ? "unchecked" : "checked"}`, {
            duration: 2000,
            description: `You have ${checked ? "unchecked" : "checked"} the task "${title}".`,
            action: {
                label: "Undo",
            onClick: () => {
                    setChecked(!checked);
                    toast.dismiss();
                }}});
        
    };

    return (
        <div className="flex items-center mb-2.5">
            <Checkbox className="mr-2.5" onClick={handleCheckboxClick} />
            <div>
                <h3 className="m-0 text-base font-medium">{title}</h3>
                <p className="m-0 text-sm text-gray-600">{body}</p>
            </div>
        </div>
    );
};

export default TaskItem;

