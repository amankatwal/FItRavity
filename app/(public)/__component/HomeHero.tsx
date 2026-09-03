import { AnimatePresence, motion, type Variants } from "framer-motion";
import Homehero from "@/public/HomePage.png"
import Image from 'next/image'
import Typewriter from 'typewriter-effect';
const HomeHero = () => {
  const MotionImage = motion(Image)
  const container: Variants ={
    hidden : {},
    visible : {
      transition: {staggerChildren : 0.3, delayChildren : 0.3}
    }
  }
  const item:Variants ={
    hidden : {
      y:10, opacity:0
    },
    visible:{
      y:0, opacity:1,
      transition : {
        duration: 0.3
      }
    }
  }
  return (
    <div className='relative'>
      <div className="max-h-screen overflow-hidden">
          <MotionImage initial={{scale:1}} whileInView={{scale:[1 , 1.09 ,1]}} transition={{duration:15, repeat: Infinity, ease: "easeInOut"}} alt='HomePage' className="w-full h-screen object-cover max-h-screen" src={Homehero} /></div>
          <div className='w-full h-screen bg-black/70 text-white absolute z-10 top-0 flex justify-center text-xl lg:text-7xl font-bold flex-col px-10'>
         
<motion.div initial="hidden" animate="visible" variants={container}>
<motion.h1 variants={item}>TRANSFORM YOUR</motion.h1>
  <motion.h1 variants={item} className='text-primary'>FITNESS JOURNEY</motion.h1>
<motion.div variants={item} className='text-chart-1 text-4xl lg:text-9xl'>
<Typewriter
  options={{
    strings: ['DISCIPLINE', 'CONSISTENCY', 'RESULTS'],
    autoStart: true,
    loop: true,
  }}
/></motion.div></motion.div>

  </div>
     
    </div>
  )
}

export default HomeHero