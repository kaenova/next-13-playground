import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const registerSchema = z
  .object({
    name: z.coerce.string().min(1),
    email: z.coerce.string().email().min(1),
    password: z.coerce.string().min(1),
  })
  .required();

export async function POST(request: NextRequest) {
  const reqData = await request.json();
  const signUpReq = registerSchema.safeParse(reqData);

  if (!signUpReq.success) {
    return NextResponse.json(signUpReq.error.flatten().fieldErrors, { status: 400 });
  }

  const signUpData = signUpReq.data;
  const hashedPassword = bcrypt.hashSync(signUpData.password, 13);

  const data = await prisma.user.create({
    data: {
      name: signUpData.name,
      email: signUpData.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(data, { status: 201 });
}
