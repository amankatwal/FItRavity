"use client"
import React from 'react'
import Image from 'next/image'
import Dumbell from "@/public/Onboarding.png"
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Features from './__components/Features'
import { EnrollementGuide } from './__components/EnrollementGuide'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
const MotionButton = motion(AnimatedButton)

export default function Contact () {
    const router = useRouter()
 const textContainer:Variants ={
    hidden : {},
    visible : {
        transition: {staggerChildren : 0.3, delayChildren : 0.3}
    }
 }
const textItem:Variants ={
    hidden : {
        y : 20,
        opacity : 0
    },
    visible : {
        y: 0,
        opacity : 1,
        transition : {
            duration : 0.3
        }
    }
}
 
  return (
    <div>
    <div className='relative'>
        <div className='max-h-[50vh] overflow-hidden'>
          <Image src={Dumbell} alt='HomePage' className="object-cover min-h-[50vh]" />
        </div>
<motion.div variants={textContainer} initial="hidden" whileInView="visible" className='w-full h-[50vh] absolute top-0 bg-black/70 z-10 flex flex-col justify-center gap-10 lg:text-5xl text-3xl font-semibold px-10'>
<motion.h1 variants={textItem} className='text-chart-1 lg:max-w-[80vh]'>
    Become a FitRavity Trainer.
</motion.h1>
<div className='items-center'>
<MotionButton className='hover:cursor-pointer' variants={textItem} onClick={()=>router.push("/onboarding/onbording-form")}>GET STARTED</MotionButton></div>
</motion.div>
<div>

</div>
    </div>
    <Features />
    <EnrollementGuide />
    </div>
  )
}
