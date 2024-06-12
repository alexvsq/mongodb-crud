"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function page() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();
  const { id } = useParams();

  const createTask = async () => {
    const result = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });
    const data = await result.json();
    if (data.status == 200) {
      router.push("/");
    }
    router.refresh();
    console.log(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createTask();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelete = async () => {
    const result = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    if (data.status == 200) {
      router.push("/");
      router.refresh();
    }
    console.log(data);
  };

  const updateTask = async () => {
    const result = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(newTask),
    });
    const data = await result.json();
    if (data.status == 200) {
      router.push("/");
      router.refresh();
    }
    console.log(data);
  };
  const getTask = async () => {
    const result = await fetch(`/api/tasks/${id}`);
    const data = await result.json();
    setNewTask({
      title: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
    getTask();
  }, [id]);

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1>{!id ? "New Task" : "Edit Task"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => handleChange(e)}
          value={newTask.title}
        />

        <textarea
          name="description"
          placeholder="Task description"
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          rows={3}
          onChange={(e) => handleChange(e)}
          value={newTask.description}
        ></textarea>

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {id ? "Update" : "Create"}
        </button>
      </form>

      {id && (
        <button
          onClick={() => handleDelete()}
          className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg"
        >
          Delete
        </button>
      )}
    </div>
  );
}
