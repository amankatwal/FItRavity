import React from 'react'
import PlanInfo from './__Componenets/PlanInfo'


export default async function PlanById({params}: {params: Promise<{ planId: string }>}) {
   const {planId} = await params
  

  return (
    <div>
    <PlanInfo planId={planId}/>
    
    </div>
  )
}