"use client";
import Image from 'next/image'
import Dumbell from "@/public/Dumbell.png"
import WelcomePlanPage from './__component/WelcomePlanPage'
import RecomendedPlan from './__component/RecomendedPlan'


export default function ClientPlans() {
 
  return (
    <div >
            <div className='max-h-[10vh] overflow-hidden relative'>
              <Image src={Dumbell} alt='HomePage' className="w-screen object-cover" />
              <div className='absolute w-full h-full bg-black/50 z-10 top-0'></div>
            </div>
        <WelcomePlanPage />
           <RecomendedPlan />
 
        </div>
  )
}
