"use client"
import { useAuthStore } from '@/app/store/authStore';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import Image from "next/image";
import {motion, AnimatePresence, type Variants} from "motion/react"
import { Equal, X } from 'lucide-react';
import { useState } from 'react';
import Logo from "@/public/logo.png"
import { ToggleTheme } from './ToggleTheme';
import { ProfileDrowpDown } from './ProfileDropDown';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { usePathname, useRouter } from 'next/navigation';



export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
    const container: Variants ={
        hidden : {},
        visible : {
          transition: {staggerChildren : 0.1, delayChildren : 0.3}
        }
      }
      const item:Variants ={
        hidden : {
          x:20, opacity:0
        },
        visible:{
          x:0, opacity:1,
          transition : {
            duration: 0.3
          }
        }
      }
    const {data : session, isPending} = authClient.useSession();
    const {signOut} = useAuthStore();
    const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    < div className='w-full flex flex-col relative'>
    <motion.div initial={{y:-30, opacity: 0}} whileInView={{y:0, opacity:1}} transition={{duration:0.3}}  className={`grid place-items-center lg:grid-cols-3 grid-cols-2 min-h-[10vh] ${sideBarOpen && "bg-card"} w-full absolute z-20`}>
        <div className='lg:text-3xl text-xl flex font-bold'>
            <div className='flex items-center lg:mr-6 mr-1'>
                 <Image src={Logo} alt="logo" width="50" />
            </div>
           
            <h1 className={`my-auto text-chart-1`}>FIT</h1>
            <h1 className='text-lime-500 my-auto'>RAVITY</h1>
        </div>
        
        <div className='lg:flex hidden justify-center my-auto px-6 py-2'>
            <ul className='flex gap-3  align-center justify-center w-full text-lg text-white font-semibold'>
                <AnimatePresence>
                <Link href="/"><motion.li variants={item} whileHover={{scale : 1.05}} whileTap={{ scale: 0.95 }} className={`${pathname === "/" && "text-primary"} px-4 py-1 hover:text-primary hover:cursor-pointer border-b-1 hover:border-primary border-b-transparent`}>Home</motion.li></Link>
                <Link href="/"><motion.li variants={item} whileHover={{scale : 1.05}} whileTap={{ scale: 0.95 }} className={`${pathname === "/plans" && "text-primary"} px-4 py-1 hover:text-primary hover:cursor-pointer border-b-1 hover:border-primary border-b-transparent`}>Plans</motion.li></Link>
               <Link href="/"><motion.li variants={item} whileHover={{scale : 1.05}} whileTap={{ scale: 0.95 }} className={`${pathname === "/about" && "text-primary"} px-4 py-1 hover:text-primary hover:cursor-pointer border-b-1 hover:border-primary border-b-transparent`}>About</motion.li></Link>
               <Link href="/contact"><motion.li variants={item} whileHover={{scale : 1.05}} whileTap={{ scale: 0.95 }} className={`${pathname === "/contact" && "text-primary"} px-4 py-1 hover:text-primary hover:cursor-pointer border-b-1 hover:border-primary border-b-transparent`}>Contact Us</motion.li></Link>

                </AnimatePresence>
            </ul>
           
            
        </div>
<div className='flex gap-3 lg:items-center w-full justify-end lg:justify-center px-2'>
    <AnimatePresence>
        {sideBarOpen &&<motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0}} transition={{duration:0.5}} className={`${sideBarOpen && "text-muted-foreground"} lg:text-white hover:cursor-pointer border-2 flex`}>
    <ToggleTheme /></motion.div> }
   </ AnimatePresence>
    <div className='lg:block hidden'>
           {isPending? null :
            
                session ? <div className='flex gap-3'>
                 <ProfileDrowpDown />
                 {session.user.role === "User" &&
                 <Button variant="link" className='text-chart-3 hover:cursor-pointer' size="lg" onClick={()=>router.push("/onboarding")}>Join Our Team</Button>
                } </div>
                :
                 <Link href="/login"><AnimatedButton size="lg" className='hidden lg:block hover:cursor-pointer hover:scale-105'>Login</AnimatedButton></Link>
            }</div>
            <div className={`lg:hidden flex items-center border-2 p-2 ${sideBarOpen ? "text-muted-foreground" : "text-white"} lg:text-white`} onClick={()=>setSideBarOpen(!sideBarOpen)}>
                <AnimatePresence mode='wait'>
               {
                sideBarOpen ?  <motion.div key="close"
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: 90, opacity: 0 }}
      transition={{ duration: 0.2 }}>
                <X />
               </motion.div> : <motion.div key="menu"
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: 90, opacity: 0 }}
      transition={{ duration: 0.2 }}>
                <Equal />
               </motion.div>
               }</AnimatePresence>
                
            </div>
        </div>
        
    </motion.div>
    {
        sideBarOpen && <motion.div initial={{opacity:0 , y:-100}} animate={{opacity:1, y:0}} exit={{opacity:0 , y:-100}} transition={{duration : 0.5}} className='flex flex-col text-center justify-between bg-card w-screen h-screen lg:hidden items-center py-[10vh]'>
            <AnimatePresence>
            <motion.ul variants={container} initial="hidden" animate="visible"  className='flex flex-col gap-3 w-full text-lg text-muted-foreground font-semibold'>
                
                <motion.li variants={item} whileTap={{ scale: 0.95 }} className='px-4 py-1 hover:text-primary hover:cursor-pointer'>Home</motion.li>
                <motion.li variants={item} whileTap={{ scale: 0.95 }} className='px-4 py-1 hover:text-primary hover:cursor-pointer'>Plans</motion.li>
                <motion.li variants={item} whileTap={{ scale: 0.95 }} className='px-4 py-1 hover:text-primary hover:cursor-pointer'>About</motion.li>
                <motion.li variants={item} whileTap={{ scale: 0.95 }} className='px-4 py-1 hover:text-primary hover:cursor-pointer'>Contact Us</motion.li>

                
            </motion.ul></AnimatePresence>
             {
                session ? <div className='flex'>
                <AnimatedButton variant="destructive" size="sm"  className='lg:hidden block hover:cursor-pointer hover:scale-110' onClick={()=>signOut()}>Logout</AnimatedButton>
                </div> :
                
                 <Link href="/login"><div className='flex w-full'><AnimatedButton size="lg" className='hover:cursor-pointer hover:scale-105 w-full'>Login</AnimatedButton></div></Link>
            }
    </motion.div>
    }
    
    </div>
  )
}
