import { NextResponse } from "next/server";
import { connectionDB } from "@/utils/mongoose";
import Task from "@/models/task";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    connectionDB();
    const taskFound = await Task.findById(params.id);

    if (!taskFound) {
      return NextResponse.json(
        {
          message: "Task not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);
    if (!deletedTask) return NextResponse.json({ message: "task not found" });
    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
