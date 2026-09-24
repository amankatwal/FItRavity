import React, { useEffect } from 'react'
import { usePlansRenderStore } from '../clientStore'

export default function AllPlans() {
    const {allPlans, fetchAllPlans} = usePlansRenderStore()
    useEffect(()=>{
    fetchAllPlans()
    },[])
  return (
    <div className='sm:px-20 py-10 px-3'>
          <h1 className='text-lg font-semibold'>Explore More</h1>
           <div>
               

            </div>
        </div>
  )
}
