"use client"
import Dumbell from "@/public/Dumbell.png"
import Image from 'next/image'
import {motion} from "framer-motion"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Home, MoveLeft } from "lucide-react"
import { ToggleTheme } from "@/app/(public)/__component/ToggleTheme"
import Link from "next/link"
import TrainerForm from "./__components/TrainerForm"
import { authClient } from "@/lib/auth-client"
import { useApplicationStore } from "@/app/store/applicationStore"
import { useEffect } from "react"
import HomeLoader from "@/components/web/HomeLoader"
import { unauthorized } from "next/navigation"
import OnboardingUnderReview from "./__components/oboardingUnderReview"
export default function page() {
const {data: session, isPending } = authClient.useSession()
const {pending, getUserApplication, applicationId}= useApplicationStore()
useEffect(()=>{
  if(session){
getUserApplication(session?.user.id)}
},[])
if(!session)
  return unauthorized()
  return (
    <div>
      <div className='relative h-[30vh] overflow-hidden'>
   <Image src={Dumbell} alt='Herogirl' className='w-full h-[30vh] object-cover absolute top-0' /> 
  <div className='w-full h-full bg-black/60 absolute top-0 z-10 flex flex-col justify-center'>

  </div>
      </div>
      <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} transition={{duration:0.3}} className="py-10 flex lg:justify-around pl-5 items-center">
        <div>
      <Link href="/"><AnimatedButton><MoveLeft /> Back to Homepage</AnimatedButton></Link></div>
      <div className="bg-card-foreground/10 lg:block hidden">
        <ToggleTheme />
      </div>
      </motion.div>
      <motion.div>
       {isPending || pending ? <HomeLoader /> : applicationId ?  <OnboardingUnderReview />  :<TrainerForm userId = {session.user.id}/>}
      </motion.div>
    </div>
  )
}
