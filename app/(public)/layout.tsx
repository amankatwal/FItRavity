"use client";
import {  ReactNode } from "react";
import { Navbar } from "./__component/Navbar";

export default function PublicLayout({children} : {children: ReactNode}){
    return(
        <div className=''>
      <div className='flex justify-center'>
        <Navbar />
      </div>
            {children}
        </div>
        
    )
}