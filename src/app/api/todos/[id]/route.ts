import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const data = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const deletedData = await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(deletedData, { status: 200 });
}

const patchSchema = z
  .object({
    id: z.number(),
    todo: z.string(),
  })
  .required();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const parsedSchema = patchSchema.safeParse({
    id: parseInt(params.id),
    todo: body.todo,
  });

  if (!parsedSchema.success) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const parsedData = parsedSchema.data;

  const data = await prisma.todo.findFirst({
    where: {
      id: parsedData.id,
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const updatedData = await prisma.todo.update({
    where: {
      id: data.id,
    },
    data: {
      name: parsedData.todo,
    },
  });

  return NextResponse.json(updatedData, { status: 200 });
}
