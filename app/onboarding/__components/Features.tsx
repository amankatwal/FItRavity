import React from 'react'
import {motion} from "framer-motion"
import { ToggleTheme } from '@/app/(public)/__component/ToggleTheme'
import {BookOpenText, HeartHandshake, Trophy, Users } from 'lucide-react'

export default function Features() {
    
  return (
    <div className='px-5 py-10 min-h-[70vh] flex flex-col gap-10 justify-center'>
        <motion.div className='flex justify-around items-center w-full' initial={{x:-20, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:0.3}} viewport={{once: true}}>
        <h1 className='lg:text-4xl text-lg font-bold text-center'>SO MANY REASONS TO START</h1>
        <div className='lg:block hidden bg-card-foreground/10'><ToggleTheme /></div></motion.div>
        <div className='grid lg:grid-cols-4 grid-cols-1 py-10 gap-10'>
<motion.div className='flex flex-col gap-10 py-10 px-5 border-1 bg-card' initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.5}} viewport={{once: true}}>
    <h1 className='text-chart-4 font-semibold text-xl flex justify-center items-center gap-3'>
    <Users /> BE PART OF TEAM
    </h1>
    <p className='text-muted-foreground text-sm font-semibold'>
        Work with passionate team of fitness Professionals,
        Learn with them Grow with them,Contrubute your knowledge and get recognization.
    </p>

</motion.div>
<motion.div className='flex flex-col gap-10 py-10 px-5 border-1 bg-card' initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.5}} viewport={{once: true}}>
    <h1 className='font-semibold text-xl flex justify-center items-center gap-3 text-chart-4'>
    <BookOpenText /> TRAIN YOUR WAY
    </h1>
    <p className='text-muted-foreground text-sm font-semibold'>
       Train with what you know and help your client to be in a shape, and get them a perfect healthy lifestyle.
       And contribute your learnings and knowledge to help the community as well.
    </p>

</motion.div>
<motion.div className='flex flex-col gap-10 py-10 px-5 border-1 bg-card' initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.5}} viewport={{once: true}}>
    <h1 className='font-semibold text-xl flex justify-center items-center gap-3 text-chart-4'>
    <Trophy /> GET REWARDED
    </h1>
    <p className='text-muted-foreground text-sm font-semibold'>
      Expand your professional network, build your expertise, and earn money on each paid enrollment, Payouts will be disbursed weekly.
    </p>

</motion.div>
<motion.div className='flex flex-col gap-10 py-10 px-5 border-1 bg-card' initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.5}} viewport={{once: true}}>
    <h1 className='font-semibold text-xl flex justify-center items-center gap-3 text-chart-4'>
    <HeartHandshake /> IMPACT LIVES
    </h1>
    <p className='text-muted-foreground text-sm font-semibold'>
      Help your clients achive fitness Goals, Track their progress in the training dashboard, Monitor clients' daily macros and workout routines, and provide personalized guidance to help them achieve lasting results.
    </p>

</motion.div>
</div>
    </div>
  )
}
