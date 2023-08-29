import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { NextAuthOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  const id = parseInt(params.id);

  const data = await prisma.todo.findFirst({
    where: {
      id: id,
      userId: session.user.id,
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

// using 'coerce' so that the primitive types will be inferred
// https://zod.dev/?id=coercion-for-primitives
const patchSchema = z
  .object({
    id: z.coerce.number(),
    todo: z.coerce.string(),
  })
  .required();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  const body = await request.json();

  const parsedSchema = patchSchema.safeParse({
    id: params.id,
    todo: body.todo,
  });

  if (!parsedSchema.success) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const parsedData = parsedSchema.data;

  const data = await prisma.todo.findFirst({
    where: {
      id: parsedData.id,
      userId: session.user.id
    },
  });

  if (!data) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const updatedData = await prisma.todo.update({
    where: {
      id: data.id,
      userId: session.user.id
    },
    data: {
      name: parsedData.todo,
    },
  });

  return NextResponse.json(updatedData, { status: 200 });
}
