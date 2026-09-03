"use client"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CirclePlusIcon, LayoutDashboard, MailIcon } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const MotionSidebarMenu = motion(SidebarMenu)
const MotionSidebarItem = motion(SidebarMenuItem)
  const container: Variants ={
    hidden : {},
    visible : {
      transition: {staggerChildren : 0.1, delayChildren : 0.3}
    }
  }
  const child:Variants ={
    hidden : {
      x:-10, opacity:0
    },
    visible:{
      x:0, opacity:1,
      transition : {
        duration: 0.3
      }
    }
  }
  const router = useRouter()
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton onClick={()=>router.push("/dashboard")}
              tooltip="Quick Create"
              className={`hover:cursor-pointer min-w-8 ${pathname === "/dashboard" && 'bg-primary text-primary-foreground'} duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground`}
            >
              <LayoutDashboard
              />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <MotionSidebarMenu initial="hidden" animate="visible" variants={container}>
          {items.map((item) => (
            <MotionSidebarItem variants={child} key={item.title}>
              <SidebarMenuButton className={`cursor-pointer ${pathname === item.url && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'}`} onClick={()=>router.push(item.url)} tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </MotionSidebarItem>
          ))}
        </MotionSidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
