import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { NextAuthOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const { todo } = await request.json();
  const session = await getServerSession(NextAuthOptions)

  if (!session?.user) {
    redirect("/auth")
  }

  if (!todo) {
    return NextResponse.json({ message: "Todo is required" }, { status: 400 });
  }

  const data = await prisma.todo.create({
    data: {
      name: todo,
      userId: session.user.id
    },
  });

  return NextResponse.json(data, { status: 201 });
}



