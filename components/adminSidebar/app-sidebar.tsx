"use client"

import * as React from "react"
import Logo from "@/public/logo.png"
import { NavDocuments } from "@/components/adminSidebar/nav-documents"
import { NavMain } from "@/components/adminSidebar/nav-main"
import { NavSecondary } from "@/components/adminSidebar/nav-secondary"
import { NavUser } from "@/components/adminSidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, FileChartColumnIcon, FileIcon, FileUser, Mail, User, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: session} = authClient.useSession()
  const data = {
  navMain: session?.user.role === "Admin" ? [

    {
      title: "Potential Partners",
      url: "/dashboard/onboarding",
      icon: (
        <FileUser />
      ),
    },
    {
      title: "Cases",
      url: "/dashboard/trainer-support",
      icon: (
       <Mail />
      ),
    },
    {
      title: "Team",
      url: "/team",
      icon: (
        <UsersIcon
        />
      ),
    },
    
  ]: session?.user.role === "Fitrainer" ? [
    {
      title: "Active Plans",
      url: "/dashboard/plans",
      icon: (
        <ShoppingBag />
      ),
    },
    {
      title: "Cases",
      url: "/dashboard/trainer-support",
      icon: (
       <Mail />
      ),
    },
  ]: session?.user.role === "Owner" ? [
     {
      title: "Potential Partners",
      url: "/dashboard/onboarding",
      icon: (
        <FileUser />
      ),
    },
   {
      title: "Plans",
      url: "/dashboard/plans",
      icon: (
        <ShoppingBag />
      ),
    },
    {
      title: "Cases",
      url: "/dashboard/trainer-support",
      icon: (
       <Mail />
      ),
    },
    {
      title: "Team",
      url: "/team",
      icon: (
        <UsersIcon
        />
      ),
    },
  ]: [

     {
      title: "Team",
      url: "/team",
      icon: (
        <UsersIcon
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <SearchIcon
        />
      ),
    },
  ],
  documents: [
    {
      name: "Users",
      url: "/users",
      icon: (
        <User />
      ),
    },
    {
      name: "Reports",
      url: "/dashboard/client-support",
      icon: (
        <FileChartColumnIcon
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: (
        <FileIcon
        />
      ),
    },
  ],
}
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <Image src={Logo} alt="Logo" className="size-8" />
                <span className="text-base font-semibold flex">
                  <h1 className="text-card-foreground">FIT</h1>
                  <h1 className="text-lime-500">RAVITY</h1>
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
