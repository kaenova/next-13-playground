import { prisma } from '@/lib/db'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TodoCard } from './TodoCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { NextAuthOptions } from '../../(routes)/api/auth/[...nextauth]/route'

const ListTodo = async () => {
  const session = await getServerSession(NextAuthOptions)

  if (!session) {
    redirect("/auth")
  }
  if (!session.user) {
    redirect("/auth")
    return
  }

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id
    }
  })
  return (
    <div className='mt-4'>
      <Card>
        <CardHeader>
          <CardTitle>Your Todo</CardTitle>
        </CardHeader>
        <CardContent>
          {
            data.length > 0 ?
              <div className='space-y-2'>
                {
                  data.map((v) => <TodoCard key={v.id} id={v.id} todo={v.name} createdAt={v.createdAt} />)
                }
              </div>
              :
              <Card className="p-4">
                <p>You haven't create anything</p>
              </Card>
          }

        </CardContent>
        <CardFooter>
          <p>You can add more todo using input above</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ListTodo