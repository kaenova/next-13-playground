"use client"

import React from 'react'
import axios from 'axios';

import { useForm } from 'react-hook-form'

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  todo: z.string().min(1).max(256)
})

const TodoInput = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [Loading, setLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "Submitting Todo",
      description: values.todo
    })
    setLoading(true)
    axios.post("/api/todos", { todo: values.todo })
      .then(() => {
        toast({
          title: "Successfully Adding Todo",
          description: values.todo
        })
        router.refresh()
      })
      .catch(() => {
        toast({
          title: "Failed Adding Todo",
          description: values.todo
        })
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="What you need todo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={Loading} type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default TodoInput