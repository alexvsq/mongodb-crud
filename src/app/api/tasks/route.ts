import { NextResponse } from "next/server";
import { connectionDB } from "@/utils/mongoose";
import Task from "@/models/task";

export async function GET() {
  connectionDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTask = new Task(data);
    const saveTask = await newTask.save();
    return NextResponse.json(saveTask);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
