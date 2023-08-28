import { prisma } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { todo } = await request.json();

  if (!todo) {
    return NextResponse.json({ message: "Todo is required" }, { status: 400 });
  }

  const data = await prisma.todo.create({
    data: {
      name: todo,
    },
  });

  return NextResponse.json(data, { status: 201 });
}



