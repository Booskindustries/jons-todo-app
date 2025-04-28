import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
} from "date-fns";
import { Task } from "@/lib/types"; // Adjust the import path as necessary
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CalendarProps = {
  tasks: Task[];
};

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrev = () => {
    if (view === "month") {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else if (view === "week") {
      setCurrentDate((prev) => addDays(prev, -7));
    } else {
      setCurrentDate((prev) => addDays(prev, -1));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else if (view === "week") {
      setCurrentDate((prev) => addDays(prev, 7));
    } else {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const handleCellClick = (date: Date) => {
    setCurrentDate(date); // Set the clicked date as the current date
    setView("day"); // Switch to day view
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.due_date), date));
  };

  const getTasksForWeek = (date: Date) => {
    return tasks.filter((task) => isSameWeek(new Date(task.due_date), date, { weekStartsOn: 0 }));
  };

  const captaliseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="p-6 w-full">
    {/* Header */}
    <div className="flex justify-center items-center mb-4">
       
        <h2 className="text-xl font-bold">
        {(() => {
            let headerText;
            if (view === "month") {
                headerText = format(currentDate, "MMMM yyyy");
            } else if (view === "week") {
                headerText = `Week of ${format(startOfWeek(currentDate), "MMM d")}`;
            } else {
                headerText = format(currentDate, "MMMM d, yyyy");
            }
            return headerText;
        })()}
        </h2>
        
    </div>

    {/* View Toggle */}
    <div className="flex justify-center mb-4 space-x-2">

      <Select onValueChange={(value) => setView(value as "month" | "week" | "day")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${captaliseFirstLetter(view)} View`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Month View</SelectItem>
          <SelectItem value="week">Week View</SelectItem>
          <SelectItem value="day">Day View</SelectItem>
        </SelectContent>
      </Select>
        <Button  variant='ghost' className="cursor-pointer" onClick={handlePrev}>{'<'}</Button>
        {/* <Button onClick={() => setView("month")} disabled={view === "month"}>
        Month View
        </Button>
        <Button onClick={() => setView("week")} disabled={view === "week"}>
        Week View
        </Button>
        <Button onClick={() => setView("day")} disabled={view === "day"}>
        Day View
        </Button> */}
        <Button className="cursor-pointer" onClick={handleNext}>{'>'}</Button>
    </div>

    {/* Calendar Container */}
    <div className="relative h-[700px]">
        {view === "month" && (
        <div className="grid grid-cols-7 gap-2 h-full">
            {/* Weekday Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold">
                {day}
            </div>
            ))}

            {/* Days */}
            {days.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentDate);
            const tasksForDate = getTasksForDate(date);

            let cellStyling = "";
            
            if (isCurrentMonth) {
              if (isSameDay(date, new Date())) {
                cellStyling = "bg-[var(--background)] text-[var(--foreground)] border-[var(--accent-foreground)]";
              } else {
                cellStyling = "bg-[var(--background)] text-[var(--foreground)]";
              }
            } else {
              cellStyling = "bg-[var(--muted)] text-[var(--muted-foreground)]";
            }

            return (
                <div
                  key={index}
                  className={`p-2 border rounded h-32 flex flex-col justify-between ${cellStyling}`}
                  
                >
                <Button variant="ghost" onClick={() => handleCellClick(date)} className="cursor-pointer text-sm font-bold">{format(date, "d")}</Button>
                {/* Display tasks */}
                <div className="overflow-hidden">
                    {tasksForDate.slice(0, 2).map((task) => (
                     <Tooltip key={task.id}>
                        <TooltipTrigger asChild>
                        <Button  
                            className="w-full cursor-pointer items-start flex flex-col items-start h-6 mb-1"
                        >
                            <h4 className="font-bold text-sm text-left">{task.title.length > 12 ? `${task.title.slice(0, 12)}...` : task.title}</h4>
                        </Button>
                        </TooltipTrigger>
                        {task.title.length > 12 ? (
                          <TooltipContent>{task.title}</TooltipContent>
                        ) : null
                        }
                      </Tooltip>
                        ))}
                        {tasksForDate.length > 2 && (
                        <div className="mt-1 text-xs text-gray-500">
                            +{tasksForDate.length - 2} more
                        </div>
                    )}
                </div>
              </div>
            );
            })}
        </div>
        )}

        {view === "week" && (
        <div className="grid grid-cols-7 gap-2 h-full">
            {/* Weekday Headers
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold">
                {day}
            </div>
            ))} */}
            {Array.from({ length: 7 }).map((_, index) => {
            const date = addDays(startOfWeek(currentDate), index);
            const tasksForDate = getTasksForDate(date);

            return (
                <div
                    key={index}
                    className="p-2 border rounded bg-[var(--background)] text-[var(--foreground)]"
                >
                {/* Date and Month */}
                <div className="text-sm font-bold">
                    {format(date, "MMM d")} {/* Example: Sep 25 */}
                </div>

                {/* Display Tasks */}
                <div className="overflow-hidden">
                    {tasksForDate.slice(0, 8).map((task) => (
                    <div
                        key={task.id}
                        className="mt-1 p-1 text-xs bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
                    >
                        <h4 className="font-bold">{task.title}</h4>
                        <p>
                            {task.description.length > 50
                                ? `${task.description.slice(0, 50)}...`
                                : task.description}
                        </p>
                    </div>
                    ))}
                    {tasksForDate.length > 8 && (
                    <div className="mt-1 text-xs text-gray-500">
                        +{tasksForDate.length - 8} more
                    </div>
                    )}
                </div>
                </div>
            );
            })}
        </div>
        )}

        {view === "day" && (
        <div className="p-4 border rounded bg-[var(--background)] text-[var(--foreground)] h-full">
            <h3 className="text-lg font-bold mb-2">
                {format(currentDate, "EEEE, MMMM d, yyyy")}
            </h3>
            <div className="overflow-hidden">
            {getTasksForDate(currentDate).map((task) => (
              <Button
                key={task.id}
                className="cursor-pointer w-full text-left h-20 flex flex-col items-start"
              >
                <h4 className="font-bold text-3xl text-left">{task.title}</h4>
                <p className="text-xl text-left">{task.description}</p>
              </Button>
            ))}
            </div>
        </div>
        )}
    </div>
</div>
  );
};

export default Calendar;