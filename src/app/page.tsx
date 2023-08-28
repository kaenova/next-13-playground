import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TodoInput from "./(dashboard)/TodoInput";
import ListTodo from "./(dashboard)/ListTodo";

export default function Home() {
  return (
    <div className="flex flex-row justify-center py-5">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Todo App</CardTitle>
          <CardDescription>This is just a simple todo app with Next, shdcn/ui, and prisma</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <TodoInput />
          </div>
          <div>
            <ListTodo />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </div>
  )
}
