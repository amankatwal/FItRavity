"use client"
import React, { useEffect } from 'react'
import { useAdminApplicationStore } from './clientStore'
import Onboarding from './__components/Onboarding'


export default function adminTrainerOnboarding() {
  
  return (
    <main className='py-10 px-5'>
      <h1 className='text-lg font-bold text-center'>Potential Partners application</h1>
      <Onboarding />
    </main>
  )
}
