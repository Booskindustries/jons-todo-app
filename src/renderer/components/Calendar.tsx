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

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.due_date), date));
  };

  const getTasksForWeek = (date: Date) => {
    return tasks.filter((task) => isSameWeek(new Date(task.due_date), date, { weekStartsOn: 0 }));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrev}>Previous</Button>
        <h2 className="text-xl font-bold">
          {(() => {
            if (view === "month") {
              return format(currentDate, "MMMM yyyy");
            } else if (view === "week") {
              return `Week of ${format(startOfWeek(currentDate), "MMM d")}`;
            } else {
              return format(currentDate, "MMMM d, yyyy");
            }
          })()}
        </h2>
        <Button onClick={handleNext}>Next</Button>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-4 space-x-2">
        <Button onClick={() => setView("month")} disabled={view === "month"}>
          Month View
        </Button>
        <Button onClick={() => setView("week")} disabled={view === "week"}>
          Week View
        </Button>
        <Button onClick={() => setView("day")} disabled={view === "day"}>
          Day View
        </Button>
      </div>

      {/* Calendar Views */}
      {view === "month" && (
        <div className="grid grid-cols-7 gap-2">
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

            return (
              <div
                key={index}
                className={`p-2 border rounded h-32 flex flex-col justify-between ${
                  isCurrentMonth
                    ? "bg-[var(--background)] text-[var(--foreground)]"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                }`}
              >
                <div className="text-sm font-bold">{format(date, "d")}</div>
                {/* Display tasks */}
                <div className="overflow-hidden">
                  {tasksForDate.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className="mt-1 p-1 text-xs bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
                    >
                    
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                  ))}
                  {tasksForDate.length > 2 && (
                    <div className="mt-1 text-xs text-gray-500">+{tasksForDate.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "week" && (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const date = addDays(startOfWeek(currentDate), index);
            const tasksForDate = getTasksForDate(date);

            return (
              <div
                key={index}
                className="p-2 border rounded h-32 flex flex-col justify-between bg-[var(--background)] text-[var(--foreground)]"
              >
                <div className="text-sm font-bold">{format(date, "EEE, MMM d")}</div>
                {/* Display tasks */}
                <div className="overflow-hidden">
                  {tasksForDate.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="mt-1 p-1 text-xs bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
                    >
                      {task.title}
                    </div>
                  ))}
                  {tasksForDate.length > 3 && (
                    <div className="mt-1 text-xs text-gray-500">+{tasksForDate.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "day" && (
        <div className="p-4 border rounded bg-[var(--background)] text-[var(--foreground)]">
          <h3 className="text-lg font-bold mb-2">{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
          <div>
            {getTasksForDate(currentDate).map((task) => (
              <div
                key={task.id}
                className="mt-1 p-2 text-sm bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
              >
                <h4 className="font-bold">{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;