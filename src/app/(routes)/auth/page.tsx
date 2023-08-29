"use client"

import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginCard from './(card)/LoginCard'
import RegisterCard from './(card)/RegisterCard'

const Auth = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center grow'>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>
        <TabsContent value="register">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth