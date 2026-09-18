import React, { useEffect } from 'react'
import { usePlansRenderStore } from '../clientStore'
import { authClient } from '@/lib/auth-client'

export default function RecomendedPlan() {
  const {data: session} = authClient.useSession()
   const {fetchPlanRecomendation, recomendedPlans, recomendedPlanLoader} = usePlansRenderStore()
   useEffect(()=>{
     if(session)
     fetchPlanRecomendation(session?.user.id)
   },[])
   
  return (
    <div className='sm:px-20 py-10 px-3'>
      <h1 className='text-2xl font-semibold'>Recomended for you</h1>
      <div className='flex'>

      </div>
    </div>
  )
}
