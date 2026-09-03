"use client"
import { useAuthStore } from '@/app/store/authStore'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { SuccessButton } from '@/components/ui/SuccessButton'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCheck, Loader2, Send } from 'lucide-react'
import { useState } from 'react'


export default function EmailVerified() {
const {verificationSuccess, verificationLoader, passwordLink} = useAuthStore();
const [email, setEmail] = useState("");
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
             FORGOT
             </h1>
              <h1 className=' text-primary font-bold '>
              PASSWORD
             </h1>
             </div>
             <form onSubmit={(e)=>{e.preventDefault(); passwordLink(email)}}>
             <div className='py-20 flex flex-col gap-10 items-center justify-center'>
              {
                verificationSuccess ? <label className='text-muted-foreground lg:font-semibold lg:text- text-center'>
                A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
               </label> : <label className='text-muted-foreground lg:font-semibold lg:text- text-center'>
              PLease enter your email address to reset your password.
             </label>
              }
             
            {!verificationSuccess && <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="xyz@example.com" className="bg-card-foreground text-card text-sm px-5 py-2 w-full"/>} 
          {
            verificationSuccess ? <SuccessButton typeof='button'><CheckCheck className='animate-in disabled hover:cursor-not-allowed'/> Mail sent</SuccessButton> : verificationLoader?
            <Button disabled className='bg-primary text-primary-foreground text-sm px-5 py-2 w-full'>
              <Loader2 className='animate-spin size-4' />
            </Button> :
            <AnimatedButton typeof='submit'>
            <Send className='transition-transform
      duration-300
      ease-in-out
      group-hover:rotate-45'/>
      Send Password Reset Link
    </AnimatedButton>
          } 
             </div></form>
      </div>
      
    </div></div>
  )
}
