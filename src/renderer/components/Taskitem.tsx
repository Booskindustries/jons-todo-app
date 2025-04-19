import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskItemProps {
    title: string;
    body: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, body, date }) => {
    return (
        <div className="flex items-center mb-2.5">
            <Checkbox className="mr-2.5" />
            <div>
                <h3 className="m-0 text-base font-medium">{title}</h3>
                <p className="m-0 text-sm text-gray-600">{body}</p>
            </div>
        </div>
    );
};

export default TaskItem;
