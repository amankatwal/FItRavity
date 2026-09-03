"use client";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

import { KeyRound, Loader } from "lucide-react"; 
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
import { useAuthStore } from "@/app/store/authStore";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
     const {googleLoader, signInWithGoogle, signInLoader, signInWithEmail} = useAuthStore();
     const router = useRouter();
     const [formdata, setFormdata] = useState({
      email : "",
      password : "",
      rememberMe : false
     })
  return (
     <AnimatePresence>
      <motion.div className='px-5 my-auto col-span-1 min-h-screen' initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
    exit={{ x: 80, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    }}>
          <div>
            <Card className='min-h-screen flex flex-col justify-around'>
              <CardHeader>
                <CardTitle className='text-center lg:text-4xl text-2xl flex flex-col gap-10 font-bold justify-center'>
                  <div className="flex justify-center items-center">
                  <Image src={Logo} alt="logo" width="50" />
                  <h1 className="text-lg text-muted-foreground">FITRAVITY</h1></div>
                  <div className="flex gap-2 justify-center">
                  <h1 className="text-muted-foreground">
                    WELCOME
                  </h1>
                  <h1 className='text-lime-500'>
                    BACK
                  </h1></div>
                </CardTitle>
                <CardDescription className='font-semibold lg:text-md text-md text-center mt-5'>Enter your Email and password to login</CardDescription>
              </CardHeader>
              <CardContent className="py-10">
                <form className='flex flex-col justify-around' onSubmit={async(e)=>{e.preventDefault(); await signInWithEmail(
                  formdata.email,
                  formdata.password,
                  formdata.rememberMe
                )}}>
                  <div className='flex flex-col lg:px-10 gap-5'>
                   <div className='flex flex-col gap-3'>
                    <Label className='lg:text-xs'>
                      Email
                    </Label>
                   <Input type='email' name="email" value={formdata.email} onChange={(e)=>{setFormdata({...formdata, email : e.target.value})}} placeholder='xyz@example.com' className='px-2 py-4 bg-neutral-200 text-black' size={5}>
                   
                   </Input>
                   </div>
                   <div className='flex flex-col gap-3'>
                    <Label className='lg:text-xs'>
                      Password
                    </Label>
                   <Input type='password' value={formdata.password} name="password" onChange={(e)=>{setFormdata({...formdata, password: e.target.value})}} className='px-2 py-4 bg-neutral-200 text-black' size={5}>
                   
                   </Input>
                   </div>
                   <div className='mt-2 flex justify-between items-center w-full'>
                    <div className='flex gap-2 items-center'>
                    <Label className='lg:text-xs'>
                      Remember me?
                    </Label>
                   <Checkbox checked={formdata.rememberMe} className="hover:cursor-pointer" onCheckedChange={()=>{setFormdata({...formdata, rememberMe: !formdata.rememberMe})}}></Checkbox></div>
                   <div>
                    <Button variant="link" typeof="button" className='text-chart-4 hover:cursor-pointer'onClick={()=>router.push("/forgot-password")}>Forgot Password?</Button>
                   
                   </div>
                   </div>
                  </div>
                  <div className='flex flex-col lg:px-10'>
                    {
                      signInLoader ? <Button className="disabled mt-10 hover:cursor-not-allowed"><Loader className="size-4 animate-spin"/>Loading...</Button> : <AnimatedButton className=" mt-10">
                        <KeyRound /> Login
                      </AnimatedButton>
                    }
                  </div>
                </form>
              </CardContent>
              <CardFooter className='min-h-[30vh] flex-col gap-6 bg-accent py-3 w-full'>
                <div className='flex flex col text-muted-foreground font-semibold text-sm'>

                  <h1 >OTHER LOGIN OPTIONS</h1>
                  <hr />
                </div>
                <div>
                  
                </div>
<div className='w-full grid lg:grid-cols-3 grid-cols-2 place-items-center gap-5'>
  <div>
  <AnimatedButton size="sm"  className='bg-blue-600 text-amber-50 hover:cursor-pointer' variant="outline">
                <FaFacebookF className='size-4'/>
                Facebook
               </AnimatedButton></div>
               <div>
               {
                googleLoader ? <AnimatedButton size="lg" className='  hover:cursor-wait' variant="secondary">
                <Spinner />
                Loading
               </AnimatedButton> :
               <AnimatedButton size="lg" className='bg-card hover:cursor-pointer hover:text-card text-card-foreground' variant="secondary" onClick={()=>signInWithGoogle()}>
                <FcGoogle className='size-4'/>
                Google
               </AnimatedButton>
               }</div>
                <div className="lg:col-span-1 col-span-2">
               <AnimatedButton size="lg" className='bg-card-foreground text-card hover:cursor-pointer' variant="secondary">
                <SiApple className='size-4'/>
                Apple
               </AnimatedButton></div>
</div>
<div className='flex justify-center items-center ga'>
  <h1 className="text-sm font-semibold">NEW HERE ?</h1> <Link href="/signup"> <Button variant="link" className='text-chart-4 hover:cursor-pointer'>Sign up</Button></Link>
</div>
              <CardAction>
               
                
              </CardAction></CardFooter>
               </Card>
          </div>
      </motion.div></AnimatePresence>
  )
}
