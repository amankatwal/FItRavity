"use client"
import { useAuthStore } from '@/app/store/authStore'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SuccessButton } from '@/components/ui/SuccessButton'
import { CheckCheck, KeyRound, Loader, Send } from 'lucide-react'
import { unauthorized, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PasswordReset() {
 const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter();
    const [formdata, setFormData] = useState({ password: '', confirmPassword: '' })
    const {passwordReset, verificationLoader, verificationSuccess, route} = useAuthStore();
    if (!token || token === "EXPIRED") {
        unauthorized()
    }
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
             PASSWORD
             </h1>
              <h1 className=' text-primary font-bold '>
              RESET
             </h1>
             </div>
             <form onSubmit={async (e)=>{e.preventDefault(); await passwordReset(formdata.password, formdata.confirmPassword, token); setTimeout(()=>{router.push(route)},2000)}}>
             <div className='py-20 flex flex-col gap-10 items-center justify-center'>
             <label className='text-muted-foreground lg:font-semibold lg:text- text-center'>
             
              Please enter new password and confirm it to reset your password.
             </label>
             <Input type="password" placeholder="Enter new password" value={formdata.password} onChange={(e)=> setFormData({...formdata, password: e.target.value})} className="bg-card-foreground text-card text-sm px-5 py-2 w-full"/>
             <Input type="password" placeholder="Confirm new password" value={formdata.confirmPassword} onChange={(e)=> setFormData({...formdata, confirmPassword: e.target.value})} className="bg-card-foreground text-card text-sm px-5 py-2 w-full"/>
          {
            verificationSuccess ? <SuccessButton typeof='button'><CheckCheck className='animate-in disabled hover:cursor-not-allowed'/> Password Reset</SuccessButton> : verificationLoader?
            <Button disabled typeof='button' className='bg-primary text-primary-foreground text-sm px-5 py-2 w-full'>
              <Loader className='animate-spin size-4' />
            </Button> :
            <AnimatedButton typeof='submit'>
            <KeyRound className='transition-transform
      duration-300
      ease-in-out
      group-hover:rotate-225'/>
      Reset Password
    </AnimatedButton>
          } 
             </div></form>
      </div>
      
    </div></div>
  )
}
