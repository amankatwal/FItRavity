"use client"
import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ThumbnailForm from './__componenets/ThumbnailForm'
import { authClient } from '@/lib/auth-client'
import { useProgramForm } from './clientStore'
import PlanBox from './__componenets/PlanBox'
import { CreatePlan } from './__componenets/CreatePlan'

export default function Plans() {
  const {data:session} = authClient.useSession()
  const {data, fetchPlansByOrgId} = useProgramForm()
  React.useEffect(()=>{
    if(session?.user.id)
    fetchPlansByOrgId(session?.user.id)
  },[])
  return (
    <div>
      <div className='px-10 py-10 flex gap-3 items-center  text-sm'>
       <Link href="/dashboard"><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'> Dashboard </span></Link><span><ChevronRight size={15}/></span><span> Plan </span>
      </div>
      <ThumbnailForm />
     <CreatePlan />
    </div>
  )
}
