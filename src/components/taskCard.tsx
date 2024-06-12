import React from "react";
import Link from "next/link";

interface Tarea {
  id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Tarea;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Link href={`/tasks/${task.id}`}>
      <article
        className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700"
        key={task.id}
      >
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <p className="text-slate-300">{task.description}</p>
      </article>
    </Link>
  );
};

export default TaskCard;
