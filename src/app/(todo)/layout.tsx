import { NavbarPadding } from '@/components/nav/Navbar'
import React from 'react'

const TodoAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavbarPadding>{children}</NavbarPadding>
  )
}

export default TodoAuth