"use client"
import React from 'react'
import Image from 'next/image'
import Dumbell from "@/public/Dumbell.png"
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { HelpCategory } from './__component/HelpCategory'
const MotionInput = motion(Input)

export default function Contact () {
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
    <div className='relative'>
        <div className='max-h-[50vh] overflow-hidden'>
          <Image src={Dumbell} alt='HomePage' className="w-screen object-cover" />
        </div>
<motion.div variants={textContainer} initial="hidden" whileInView="visible" className='w-screen h-[50vh] absolute top-0 bg-black/70 z-10 flex flex-col justify-center gap-10 lg:text-5xl text-5xl font-semibold px-10 text-chart-1'>
<motion.h1 variants={textItem}>
    How can we help?
</motion.h1>
<MotionInput variants={textItem} className='bg-white lg:w-2xl w-3xs px-3 text-black' placeholder='type some keywords...'></MotionInput>
</motion.div>
<div>
    <HelpCategory />
</div>
    </div>
  )
}
