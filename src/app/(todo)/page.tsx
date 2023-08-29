import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TodoInput from "./(dashboard)/TodoInput";
import ListTodo from "./(dashboard)/ListTodo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextAuthOptions } from "../(routes)/api/auth/[...nextauth]/route";
import DeleteUser from "./(dashboard)/DeleteUser";

export default async function Home() {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) {
    redirect("/auth");
  }
  return (
    <div className="flex flex-row py-5 justify-center items-center">
      <div className="flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center space-x-6" >
          <div className="space-y-2">
            <CardTitle>Todo App</CardTitle>
            <CardDescription>This is just a simple todo app with Next, shdcn/ui, and prisma</CardDescription>
            <CardDescription className="flex flex-row space-x-2 gap-2">👋 {session.user.name} | {session.user.email}</CardDescription>
          </div>
          <DeleteUser />
        </CardHeader>
        <Card className="p-5">
          <TodoInput />
        </Card>
        <ListTodo />
      </div>
    </div>
  )
}
