import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TodoInput from "../(dashboard)/TodoInput";
import ListTodo from "../(dashboard)/ListTodo";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) {
    redirect("/auth");
  }
  return (
    <div className="flex flex-row py-5 justify-center items-center">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>Todo App</CardTitle>
          <CardDescription>This is just a simple todo app with Next, shdcn/ui, and prisma</CardDescription>
          <CardDescription className="flex flex-row space-x-2 gap-2">👋 {session.user.name} | {session.user.email}</CardDescription>
        </CardHeader>
        <Card className="w-[800px] p-5">
          <TodoInput />
        </Card>
        <ListTodo />
      </div>
    </div>
  )
}
