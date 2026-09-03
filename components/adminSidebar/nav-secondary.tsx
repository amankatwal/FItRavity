"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { motion, type Variants } from "framer-motion"
export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const MotionSidebarMenu = motion(SidebarMenu)
  const MotionSidebarItem = motion(SidebarMenuItem)

    const container: Variants = {
      hidden : {},
      visible : {
        transition : {staggerChildren : 0.1, delayChildren:0.3}
      }
    }
    const children: Variants = {
      hidden: {x:-10, opacity:0},
      visible:{
        x:0, opacity:1,
        transition : {
          duration: 0.3
        }
      }
    }
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <MotionSidebarMenu initial="hidden" animate="visible" variants={container}>
          {items.map((item) => (
            <MotionSidebarItem key={item.title} variants={children}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </MotionSidebarItem>
          ))}
        </MotionSidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
