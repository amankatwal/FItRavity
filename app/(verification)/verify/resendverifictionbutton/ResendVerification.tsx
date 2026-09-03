"use client"
import { useAuthStore } from '@/app/store/authStore'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { Button } from '@/components/ui/button'
import { SuccessButton } from '@/components/ui/SuccessButton'
import { Loader, Send } from 'lucide-react'
import React from 'react'

export default function ResendVerification({email}: {email : string}) {
  const {verificationEmail, verificationLoader, verificationSuccess} = useAuthStore()
  return (
    <div>{
        verificationLoader ? <Button variant="outline" className="bg-card-foreground text-card hover:cursor-progress"><Loader className='size-4 animate-spin'/>Loading ....</Button> : 
        verificationSuccess ? <SuccessButton>Verification email sent to {email}</SuccessButton> : 
        <AnimatedButton onClick={() => verificationEmail(email)}><Send className='size-4 animate-accordion-down'/>  Resend Verification</AnimatedButton> 
        }</div>
  )
}
