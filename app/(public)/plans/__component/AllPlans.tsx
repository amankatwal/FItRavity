import React, { useEffect, } from 'react'
import { usePlansRenderStore } from '../clientStore'
import InfiniteScroll from "react-infinite-scroll-component"
import PlanBox from './PlanBox'
import { Loader } from 'lucide-react'
import MobilePlanBox from './MobilePlanBox'

export default function AllPlans() {
    const {allPlans, fetchAllPlans, allPlanMoreLoader, haveMoreAll, fetchMorePlans, allPlanLoader} = usePlansRenderStore()
    useEffect(()=>{
    fetchAllPlans()
    },[])
  return (
    <section>
    <div className='sm:px-20 py-10 px-3 sm:block hidden'>
          <h1 className='text-lg font-semibold'>Explore More</h1>
          <InfiniteScroll
        dataLength={allPlans.length}
        next={()=>fetchMorePlans()}
        hasMore={haveMoreAll}
        loader={
          <div className="flex justify-center py-5">
            <Loader className="animate-spin" />
          </div>
        }
        endMessage={
          <p className={`text-center py-5 font-semibold text-muted-foreground ${(allPlanMoreLoader || allPlanLoader) && "hidden"}`}>
            No more plans
          </p>
        }
      >
           <div className='grid sm:grid-cols-4 gap-5' >
               {allPlans.map((plan) => (
                           <div
                            
                             key={plan.id}
                             >
                             <PlanBox plan={plan} />
                           </div>
                         ))}
            </div></InfiniteScroll>
        </div>
    <div className='sm:hidden block'>
          <h1 className='text-lg font-semibold'>Explore More</h1>
          <InfiniteScroll
        dataLength={allPlans.length}
        next={()=>fetchMorePlans()}
        hasMore={haveMoreAll}
        loader={
          <div className="flex justify-center py-5">
            <Loader className="animate-spin" />
          </div>
        }
        endMessage={
          <p className={`text-center py-5 font-semibold text-muted-foreground ${(allPlanMoreLoader || allPlanLoader) && "hidden"}`}>
            No more plans
          </p>
        }
      >
           <div className='grid gap-5' >
               {allPlans.map((plan) => (
                           <div
                            
                             key={plan.id}
                             >
                             <MobilePlanBox plan={plan} />
                           </div>
                         ))}
            </div></InfiniteScroll>
        </div>
    
        
        </section>
  )
}
