"use client"

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { RotateCcw } from 'lucide-react'

export const TodoCard = (props: { id: number, todo: string, createdAt: Date }) => {
  const [DataTodo, setDataTodo] = React.useState(props.todo)
  const [Loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const router = useRouter()

  function handleDelete() {
    setLoading(true)
    toast({
      title: "Deleting Todo",
      description: props.todo
    })
    axios.delete(`/api/todos/${props.id}`)
      .then(_ => {
        toast({
          title: "Successfully Delete Todo",
          description: props.todo
        })
        router.refresh()
      })
      .catch(_ => {
        toast({
          title: "Failed Delete Todo",
          description: props.todo
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleUpdate() {
    setLoading(true)
    toast({
      title: "Updating Todo",
      description: `from ${props.todo} to ${DataTodo}`
    })
    axios.patch(`/api/todos/${props.id}`, { todo: DataTodo })
      .then(_ => {
        toast({
          title: "Successfully Update Todo",
          description: `from ${props.todo} to ${DataTodo}`
        })
        router.refresh()
      })
      .catch(_ => {
        toast({
          title: "Failed Update Todo",
          description: `from ${props.todo} to ${DataTodo}`
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg flex space-x-4'><Input value={DataTodo} onChange={(e) => setDataTodo(e.target.value)} /> <Button onClick={() => setDataTodo(props.todo)} variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button></CardTitle>
        <CardDescription>{props.createdAt.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardFooter className='space-x-4'>
        <Button disabled={Loading} onClick={handleUpdate} variant="outline">Update</Button>
        <Button disabled={Loading} onClick={handleDelete} variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  )
}
