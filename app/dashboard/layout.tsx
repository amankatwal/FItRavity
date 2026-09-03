"use client"
import { AppSidebar } from "@/components/adminSidebar/app-sidebar"
import { SiteHeader } from "@/components/adminSidebar/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { authClient } from "@/lib/auth-client"
import { forbidden, unauthorized } from "next/navigation"
import { ReactNode } from "react"

export default function adminLayout({children} : {children : ReactNode}) {
  const {data : session, isPending} = authClient.useSession();
  if(isPending){
    return null
  }
  if(!session){
    return unauthorized()
  }
  if(session.user.role === "User"){
    return forbidden()
  }
  return (
    <TooltipProvider>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider></TooltipProvider>
  )
}
