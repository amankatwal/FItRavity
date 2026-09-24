"use client";
import {  ReactNode } from "react";
import { Navbar } from "./__component/Navbar";
import HomeLoader from "@/components/web/HomeLoader";
import { authClient } from "@/lib/auth-client";
export default function PublicLayout({children} : {children: ReactNode}){
    const {isPending} = authClient.useSession()
    return(
        <div>
         {isPending ? <HomeLoader /> :
        <div className=''>
            
      <div className='flex justify-center'>
        <Navbar />
      </div>
            {children}
        </div>}
        </div>
    )
}