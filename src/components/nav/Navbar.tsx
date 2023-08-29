"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"

export const NavbarPadding = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='w-full h-16'></div>
      {children}
    </>
  )
}

export const Navbar = () => {
  const [ShowLogout, setShowLogout] = React.useState(false)
  const { setTheme } = useTheme()
  const session = useSession()
  const { toast } = useToast()

  React.useEffect(() => {
    if (session.status == 'authenticated') {
      setShowLogout(true)
    } else {
      setShowLogout(false)
    }
  }, [session.status])

  function handleLogout() {
    if (session.status !== 'authenticated') return
    toast({
      title: "Signing Out"
    })
    signOut()
      .then(() => {
        toast({
          title: "Successfully Signing Out"
        })
      })
      .catch(() => {
        toast({
          title: "Failed Signing Out"
        })
      })
  }

  return (
    <>
      <div className='border w-full border-t-0 fixed bg- h-16 bg-background flex flex-row items-center z-10' >
        <div className="flex flex-row items-center h-full px-4 space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {
            ShowLogout &&
            <Button onClick={handleLogout} variant="outline">Sign Out</Button>
          }
        </div>
      </div>

    </>
  )
}