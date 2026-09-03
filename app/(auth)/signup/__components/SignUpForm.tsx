"use client";
import { Button } from "@/components/ui/button"
import { IoIosMail } from "react-icons/io";
import { Input } from '@/components/ui/input';
import Logo from "@/public/logo.png"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { redirect, useRouter } from "next/navigation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Loader } from "lucide-react";
export default function SignUpForm(){
  const [step,setStep] = useState(1);
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
  })
  const {signUp, signUpLoader, route} = useAuthStore();
  const router = useRouter();
  return (
    
       <AnimatePresence>
      <motion.div className='px-5 my-auto col-span-1'  initial={{ x: 80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 80, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    }}>
          <div>
            <Card className='min-h-svh flex flex-col justify-around max-h-screen'>
              <CardHeader>
                <CardTitle className='text-center lg:text-4xl text-2xl flex flex-col gap-10 font-bold justify-center'>
                  <div className="flex justify-center items-center">
                  <Image src={Logo} alt="logo" width="50" />
                  <h1 className="text-lg text-muted-foreground">FITRAVITY</h1></div>
                  <div className="flex gap-2 justify-center">
                  <h1 className="text-muted-foreground">
                    GET
                  </h1>
                  <h1 className='text-lime-500'>
                    STARTED
                  </h1></div>
                </CardTitle>
                <CardDescription className='font-semibold lg:text-lg text-md text-center mt-7'>Enter your Email to login</CardDescription>
              </CardHeader>
              <CardContent className="pb-20">
                <form className='flex flex-col justify-around' onSubmit={async(e)=> { e.preventDefault(); await signUp(formData.email,
      formData.password,
      formData.name,
      formData.confirmPassword)}}>{
                  step === 1 ? 
                  <motion.div className='flex flex-col lg:px-10 gap-5' initial={{x : 100}} animate={{x: 0}} exit={{x:100}}>
                   <div className='flex flex-col gap-6'>
                    <Label className='lg:text-lg'>
                      Full Name
                    </Label>
                   <Input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className='px-2 py-4 bg-neutral-200 text-black font-semibold text-sm' size={5}>
                   
                   </Input>
                   
                   </div>
                    <div className='flex flex-col gap-6'>
                    <Label className='lg:text-lg'>
                      Email
                    </Label>
                   <Input type='email' required value={formData.email} placeholder='xyz@example.com' onChange={(e) => setFormData({...formData, email: e.target.value})} className='px-2 py-4 bg-neutral-200 text-black font-semibold text-sm' size={5}>
                   
                   </Input>
                   
                   </div>
                   <Button className='text-md mt-10 hover:cursor-pointer' type="button" onClick={()=> {formData.name && formData.email && setStep(2)}}><IoIosMail className='size-6'/> Continue with Email</Button>
                  </motion.div>:
                  <motion.div className='flex flex-col lg:px-10 gap-5' initial={{x : 100}} animate={{x: 0}} exit={{x:100}}>
                   <div className='flex flex-col gap-6'>
                    <Label className='lg:text-lg'>
                      Password
                    </Label>
                   <Input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} name="password" className='px-2 py-4 bg-neutral-200 text-black font-semibold text-sm' size={5}>
                   
                   </Input>
                   
                   </div>
                    <div className='flex flex-col gap-6'>
                    <Label className='lg:text-lg'>
                      Confirm Password
                    </Label>
                   <Input type='password' required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder='xyz@example.com' name="confirm-password"  className='px-2 py-4 bg-neutral-200 text-black font-semibold text-sm' size={5}>
                   
                   </Input>
                   
                   </div>
                   {
signUpLoader ? <Button className = "disabled hover:cursor-progress" type="button"><Loader className="size-4 animate-spin"/>Loading...</Button> :<AnimatedButton type="submit" className="hover:cursor-pointer">Sign-Up</AnimatedButton>
                   }
                   
                  </motion.div>
                  }
                  
                  <div className='flex flex-col lg:px-10'>
                   
                  </div>
                </form>
              </CardContent>
              <CardFooter className='min-h-[30vh] flex-col gap-6 bg-accent py-3 lg:py-10'>
                <div className='flex flex col text-muted-foreground font-semibold text-sm'>

                  <h1 >OTHER LOGIN OPTIONS</h1>
                  <hr />
                </div>
                <div>
                  
                </div>
<div className='flex justify-around w-full mx-10'>
  <Button size="icon-lg" className='bg-sky-700 text-amber-50 hover:cursor-pointer' variant="outline">
                <FaFacebookF className='size-6'/>
               </Button>
               <Button size="icon-lg" className='bg-neutral-200' variant="outline">
                <FcGoogle className='size-6'/>
               </Button>
               <Button size="icon-lg" className='bg-neutral' variant="outline">
                <SiApple className='size-6'/>
               </Button>
</div>
<div className='flex justify-center items-center gap-3'>
  <h1 className="text-sm font-semibold">Already user?</h1> <Link href="/login"> <Button variant="link" className='text-chart-4 hover:cursor-pointer'>Log in</Button></Link>
</div>
              <CardAction>
               
                
              </CardAction></CardFooter>
               </Card>
          </div>
       </motion.div></AnimatePresence>
    
  )
}
