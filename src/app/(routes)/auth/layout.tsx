import { getServerSession } from 'next-auth'
import React from 'react'
import { NextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  // NOTE: This is how you get session on server side
  const session = await getServerSession(NextAuthOptions)

  if (session?.user) {
    redirect("/todo")
  }

  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout