"use client";
import {  ReactNode } from "react";
import Login from "@/public/Signup.png"
import Image from "next/image";

export default function AuthLayout({children} : {children: ReactNode}){
    return(
        <div className='grid lg:grid-cols-3 grid-cols-1'>
      <div className='col-span-2 flex justify-center'>
          <Image src={Login} className="lg:block hidden my-auto" width={500} alt="login"/>
      </div>
            {children}
        </div>
        
    )
}