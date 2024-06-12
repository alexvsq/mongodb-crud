import { connectionDB } from "@/utils/mongoose";
import Task from "../models/task";
import TaskCard from "@/components/taskCard";

async function loadTask() {
  connectionDB();
  const task = await Task.find();
  return task;
}

export default async function Home() {
  const tareas = await loadTask();
  return (
    <div>
      <h1 className="text-3xl font-bold ">Hello world</h1>
      <div className=" grid grid-cols-3 gap-2">
        {tareas.map((task) => {
          return <TaskCard task={task} />;
        })}
      </div>
    </div>
  );
}
