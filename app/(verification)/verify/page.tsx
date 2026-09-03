
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu'
import { auth } from '@/lib/auth'
import { Mail } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect, unauthorized } from 'next/navigation'
import React from 'react'
import { Check } from "lucide-react";
import { SuccessButton } from '@/components/ui/SuccessButton'
import ResendVerification from './resendverifictionbutton/ResendVerification'


export default async function page() {

  const session = await auth.api.getSession({
    headers : await headers()
  })
  if(!session?.user) return unauthorized();
    if(session.user.emailVerified) return redirect("/")
  return (
<div>
  <div className = "w-full bg-card h-[7vh] flex font-bold lg:text-4xl text-2xl items-center py-5 px-10">
      <h1>
        FIT
      </h1>
      <h1 className='text-lime-500'>
        RAVITY
      </h1>
  </div>
<div className='flex items-center justify-center h-[90vh]'>
  <div className='max-w-[70vh] px-10'>
    <div className=' py-10 flex gap-2 lg:text-3xl items-center justify-center text-lg'>

    
         <h1 className=' text-accent-foreground font-bold '>
          PLEASE VERIFY YOUR
         </h1>
          <h1 className=' text-primary font-bold '>
          EMAIL
         </h1>
         </div>
         <div className='py-20 flex flex-col gap-10 items-center justify-center'>
         <h1 className='text-muted-foreground lg:font-semibold lg:text- text-center'>
          We have sent a verification link to your email address. Please check your inbox and click on the link to verify your email.
         </h1>
       <ResendVerification email={session.user.email}>
  Success
</ResendVerification>;
         </div>
  </div>
  
</div></div>
  )
}
