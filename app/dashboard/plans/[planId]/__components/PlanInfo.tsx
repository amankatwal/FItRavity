"use client"
import React, { useEffect } from 'react'

import { BookOpenText, GitBranch,
  Clock3,
  UsersRound,
  Target,
  Route, CalendarDays, ChartBarBig, ChartNoAxesCombined, ChevronRight, CircleCheck, Clock, Dumbbell,  Salad, Send, Toolbox, Video, 
  Loader} from 'lucide-react'
import Link from 'next/link'
import { useProgramForm } from '../../clientStore'
import { GoAlertFill, GoGoal } from "react-icons/go";
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {  MdVerified } from "react-icons/md";
import { authClient } from '@/lib/auth-client'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TbUserScreen } from "react-icons/tb";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { EditPlanNameDialog } from './EditPlanNameDialog'
import { EditPlaninfoDIalog } from './EditPlaninfoDIalog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { EditPlanOverviewdialog } from './EditPlanOverviewdialog'
import { EditPlanDurationBreakdownDialog } from './EditPlanDurationBreakdownDialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FaCheckCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
export default function PlanInfo({planId}: {planId:string}) {
     const {data:session} = authClient.useSession()
    const {plan,data, fetchPlanById, fetchPlansByOrgId, updatePlanFeatures, updatePlanLoader, deactivatePlan,planActivationLoader, createVectorPlan} = useProgramForm()
    useEffect(()=>{
        if(session?.user)
            fetchPlansByOrgId(session?.user.id)
        fetchPlanById(planId)

    },[])
    function toggleFeature(feature:string, value:boolean){
      if(session?.user && plan?.id)
      updatePlanFeatures(session?.user.id, plan?.id, feature, value)
    }
  return (
    <div><section className='px-10 py-10 flex gap-3 items-center  text-sm'>
      <Link href="/dashboard"><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'> Dashboard </span></Link><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'><ChevronRight size={15}/></span><Link href="/dashboard/plans"><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'> Plan </span></Link>  <span><ChevronRight size={15}/></span><span>{plan?.name} </span>
    </section>
    
        <section className='flex gap-10 px-20 py-10 relative'>
          <div className='absolute top-5 right-20'>
          <EditPlanNameDialog  /></div>
            <div className='relative max-h-[400px]'>
                <div className='w-full h-full bg-black/50 absolute z-10'>
                 <Badge className={`absolute top-5 right-5 bg-[#C4A651]/60 px-2 py-1 text-black font-semibold`}>
                    {plan?.duration} days
                 </Badge>
                </div>
                <Image src={`https://res.cloudinary.com/dwyvsmlx3/image/upload/v1786440423/${data?.logo}`} width={300} height={100} alt='Plan Thumbnail' className='rounded-lg w-[600px] h-[400px] object-cover'/>
            </div>
            <span className='flex flex-col gap-5 w-full'>
                <h1 className='text-3xl font-bold flex gap-3'>{plan?.name}</h1>
               
                <div className='flex gap-10'>
                <Image width={1000} height={1000} className='w-[100px] h-[100px] object-cover rounded-full' src={`https://res.cloudinary.com/dwyvsmlx3/image/upload/w_500,h_500,c_fill,q_auto,f_auto/v1786440423/${data?.members[0].profileImage}`} alt='Curator'/>
            <div className='flex flex-col gap-2'>
                
                <span className='flex gap-1'><p className='text-sm font-bold'>{data?.curatorName}</p>{data?.members[0].certifications && <MdVerified className='text-blue-700' size={12}/>}</span>
                 <span className='flex gap-1 text-sm text-muted-foreground'>{data?.members[0].certifications && <p>Certified</p>}<p>{data?.members[0].specialization}</p></span>
                  <span className='flex gap-1 text-xs text-muted-foreground'>Exp: {data?.members[0].experience}</span>
            </div>
            </div>
            <div className='text-sm font-semibold'>
              {plan?.shortInfo}
            </div>
            <div className='w-full bg-chart-5/10 flex items-center justify-around py-5'>
             <span className='flex gap-5 items-center'>
              
              <ChartBarBig size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Level
              </h1>
              <p>{plan?.level}</p>
              </span>
             </span>
               <span className='flex gap-5 items-center'>
              
              <Clock size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Duration
              </h1>
              <p>{plan?.duration} days</p>
              </span>
             </span>
             {plan && parseInt(plan?.restDays) && 
             <span className='flex gap-5 items-center'>
             
              <Dumbbell size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Workout
              </h1>
              <p>{7-(parseInt(plan?.restDays))} days/week</p>
              </span>
             </span>
             } 
               
               <span className='flex gap-5 items-center'>
              
              <Toolbox size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Equipement
              </h1>
              <p>{plan?.equipment}</p>
              </span>
             </span>
             <span className='flex gap-5 items-center'>
              
              <GoGoal size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Goal
              </h1>
              <p>{plan?.goal}</p>
              </span>
             </span>
            </div>
            <div className='w-full bg-chart-5/10 h-full grid grid-cols-2 py-5'>
               <span>
                {plan?.actualPrice === plan?.offerPrice ? 
                <span className='flex flex-col justify-center items-center'>
                  <h1 className='text-muted-foreground font-bold text-xs'>
                    Price
                  </h1>
                  <h1 className='text-3xl font-semibold'>
                    {plan?.currency}  {Number(plan?.offerPrice).toLocaleString("en-US")}
                  </h1>
                </span> 
                
                : <span className='flex gap-10 justify-between items-cente mx-10'>
                  <span className='flex gap-3 flex-col'>
                  <h1 className='text-muted-foreground font-bold text-xs'>
                   Offer Price
                  </h1>
                  <h1 className='text-3xl font-semibold'>
                    {plan?.currency}  {Number(plan?.offerPrice).toLocaleString("en-US")}
                  </h1>
                  </span>
                  <span className='flex flex-col gap-3'>
                  <h1 className='text-muted-foreground font-bold text-xs'>
                   Actual Price
                  </h1>
                  <h1 className='text-muted-foreground font-semibold line-through text-lg '>
                    {plan?.currency}  {Number(plan?.actualPrice).toLocaleString("en-US")}
                  </h1>
                  <Badge className='bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 text-sm px-2 py-1' >
                          {Math.floor(100-((Number(plan?.offerPrice)/Number(plan?.actualPrice))*100))} % off
                  </Badge>
                  </span>
                  </span>}
               </span>
               <span className='w-full flex justify-center items-center'>
              <AnimatedButton className='group hover:cursor-not-allowed' disabled>Buy</AnimatedButton>
               </span>
            </div>
            </span>
        </section>
        <section className='grid grid-cols-3 px-10 py-10 gap-5 relative'>
          <div className='absolute top-5 right-20'>
          <EditPlaninfoDIalog />
          </div>
          <div className='col-span-2 flex flex-col gap-20'>
           <h1 className='text-2xl font-semibold'>About This Program</h1>
           <p className='text-muted-foreground'>{plan?.description?.slice(0,300)}...<span className='text-chart-4 underline hover:cursor-pointer'> <Dialog >
     
        <DialogTrigger><span className='text-chart-4 underline hover:cursor-pointer mt-10'>More Info</span></DialogTrigger>
        <DialogContent className="sm:max-w-3xl overflow-y-scroll max-h-[70vh]">
          <DialogHeader>
            <DialogTitle>About this Program</DialogTitle>
            <DialogDescription>
              {plan?.shortInfo}
            </DialogDescription>
          </DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>
              {plan?.description}
            </DialogDescription>
          <DialogFooter>
            <DialogClose><AnimatedButton variant="outline">Close</AnimatedButton></DialogClose> 
          
          </DialogFooter>
        </DialogContent>
      
    </Dialog></span></p>
          </div>
          <Card className='bg-chart-5/10'>
            <CardHeader>
              <CardTitle>What you will achieve</CardTitle>
            </CardHeader>
            <CardFooter>
              <div className='flex flex-col gap-3'>
                {plan?.achievements.map((achievement)=>
                  <span key={achievement} className='flex  gap-5 items-center'>
                    <CircleCheck className='text-chart-4' />
                    <p className='text-sm font-semibold'>{achievement}</p>
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
             
        </section>
        <section className='p-10 flex flex-col gap-10'>
          <h1 className='text-2xl font-semibold'>What is included</h1>
          <div className='grid grid-cols-4 gap-10'>

         <Card className='bg-chart-4/10 relative'>
         <div className="flex items-center space-x-2 absolute top-5 right-5">
          <Label htmlFor="airplane-mode">{plan?.blogspotAccess ? "Enabled" : "Disabled"}</Label>
      <Switch disabled={updatePlanLoader} className='hover:cursor-pointer' id="airplane-mode" checked={plan?.blogspotAccess} onClick={()=>toggleFeature("blogspotAccess", !plan?.blogspotAccess)}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <BookOpenText className='text-chart-4'/>
            <CardTitle>Blog access</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
              You'll be able to see articles from <span className='font-bold'>{data?.name.split(' ')}</span>
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className=' bg-chart-4/10 relative'>
          <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.trainingSchedule ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' disabled={updatePlanLoader} id="airplane-mode" onClick={()=>toggleFeature("trainingSchedule", !plan?.trainingSchedule)}  checked={plan?.trainingSchedule}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <CalendarDays className='text-chart-4'/>
            <CardTitle>Training Schedule</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             <span className='font-bold'>{data?.name.split(' ')}</span> will post the training schedules and you can follow the schedule and update the progress for review
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
          <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.progressTracking ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' disabled={updatePlanLoader} id="airplane-mode" onClick={()=>toggleFeature("progressTracking", !plan?.progressTracking)}  checked={plan?.progressTracking}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <ChartNoAxesCombined className='text-chart-4'/>
            <CardTitle>Progreess Tracking</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             Once you mark the training as completed it will be saved in the completed schedule and <span className='font-bold'>{data?.name.split(' ')}</span> will be able to check your progress and make the best training program for you.
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
          <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.chatAccess ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' id="airplane-mode" disabled={updatePlanLoader} onClick={()=>toggleFeature("chatAccess", !plan?.chatAccess)}  checked={plan?.chatAccess}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <Send className='text-chart-4'/>
            <CardTitle>Chat with Trainer</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             Once you mark the training as completed it will be saved in the completed schedule and <span className='font-bold'>{data?.name.split(' ')}</span> will be able to check your progress and make the best training program for you.
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
          <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.dietInstructions ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' id="airplane-mode" disabled={updatePlanLoader} onClick={()=>toggleFeature("dietInstructions", !plan?.dietInstructions)}  checked={plan?.dietInstructions}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <Salad className='text-chart-4'/>
            <CardTitle>Nutrition Guide</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             With this plan you will also be able to get the proper instructions for the diet. While getting full control on your macros with our AI powered nutrition calculator will show you your daily calories intake and our trainer can look into it to give the best diet plan for you
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
          <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.trainingVideos ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' id="airplane-mode" disabled={updatePlanLoader}  onClick={()=>toggleFeature("trainingVideos", !plan?.trainingVideos)} checked={plan?.trainingVideos}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <Video className='text-chart-4'/>
            <CardTitle>Detailed Videos</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             You will get the access of exclusive content that <span className='font-bold'>{data?.name.split(' ')}</span> will share in the form of media and elevate your knowledge on that
            </CardDescription>
           </CardFooter>
          </Card>
           <Card className='bg-chart-4/10 relative'>
           <div className="flex items-center space-x-2 absolute top-5 right-5 ">
          <Label htmlFor="airplane-mode">{plan?.privateSession ? "Enabled" : "Disabled"}</Label>
      <Switch className='hover:cursor-pointer' id="airplane-mode" disabled={updatePlanLoader} onClick={()=>toggleFeature("privateSession", !plan?.privateSession)}  checked={plan?.privateSession}/>
      
    </div>
           <CardHeader className='flex flex-col gap-3'>
            <TbUserScreen size={25} className='text-chart-4'/>
            <CardTitle>1 : 1 Session</CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             This special perk will allow you to have the conversation via video meeting to the Trainer where your trainer may get to know even better and give you exclusivity and will elevate your training experience. However The  timings and dates may vary.
            </CardDescription>
           </CardFooter>
          </Card>
           <Card>
          
           <CardHeader className='flex flex-col justify-center gap-3'>
            
            <CardTitle className='w-full flex justify-between'>Plan Status : {plan?.isActive ?  <Badge className="border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40">
      <span
        className="size-2 rounded-full bg-green-600 dark:bg-green-400"
        aria-hidden="true"
      />
      Active
    </Badge> :
    <Badge className="bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive border-none focus-visible:outline-none">
      <span className="bg-destructive size-2 rounded-full" aria-hidden="true" />
      Not published
    </Badge>
    
    }
    
    </CardTitle>
    <div>
      <Alert
      variant="destructive"
      className="border-destructive bg-destructive/5 mt-5"
    >
      <GoAlertFill className="size-4" />
      <AlertTitle>A trainer can activate only one plan per day.</AlertTitle>
    </Alert>
    </div>
           </CardHeader>
           <CardFooter>
             
            <CardDescription className='w-full flex justify-center'>
             {plan?.isActive ? <div >
              {planActivationLoader ?<Button>Deactivating...<Loader className='animate-spin'/></Button>: 
              
              <AnimatedButton variant="destructive" onClick={()=>session?.user.id && deactivatePlan(session?.user.id, plan.id)}>Deactivate temporarily</AnimatedButton> }
             </div>: <div>
              {planActivationLoader ? <Button>Publishing...<Loader className='animate-spin'/></Button> : 
              <AnimatedButton onClick={()=>session?.user.id && plan && createVectorPlan(session?.user.id, plan.id)}>Publish</AnimatedButton>}</div>}
            </CardDescription>
           </CardFooter>
          </Card>
          </div>
        </section>
        <section className='p-10'>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <div className="rounded-xl border p-5 shadow-sm relative">
        <div className='absolute top-3 right-3'>
             <EditPlanOverviewdialog />
        </div>
        <h2 className="mb-5 text-[16px] font-semibold">
          Program Overview
        </h2>

        <div className="space-y-3.5">
          <div className="grid grid-cols-[18px_145px_1fr] items-center gap-3">
            <Dumbbell
              size={15}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium text-muted-foreground">
              Program Type
            </span>

            <span className="text-sm font-semibold">
              {plan?.programType}
            </span>
          </div>

          <div className="grid grid-cols-[18px_145px_1fr] items-center gap-3">
            <Clock3
              size={15}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium text-muted-foreground">
              Rest Days
            </span>

            <span className="text-sm font-semibold">
              {plan?.restDays}
            </span>
          </div>

          <div className="grid grid-cols-[18px_145px_1fr] items-center gap-3">
            <UsersRound
              size={15}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium text-muted-foreground">
              Recommended For
            </span>

            <span className="text-sm font-semibold">
              {plan?.recomendedFor}
            </span>
          </div>


          <div className="grid grid-cols-[18px_145px_1fr] items-center gap-3">
            <Target
              size={15}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium text-muted-foreground">
              Focus Areas
            </span>

            <span className="text-sm font-semibold">
              {plan?.focusArea}
            </span>
          </div>

          <div className="grid grid-cols-[18px_145px_1fr] items-center gap-3">
            <Route
              size={15}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium text-muted-foreground">
              Program Structure
            </span>

            <span className="text-sm font-semibold">
              {plan?.programStructure}
            </span>
          </div>

        </div>
      </div>
      <div className="rounded-xl border p-5 shadow-sm relative">
         <div className='absolute top-3 right-3'>
             <EditPlanDurationBreakdownDialog />
        </div>
        <h2 className="mb-5 text-[16px] font-semibold">
         Program duration Breakdown
        </h2>

        <div className="overflow-hidden rounded-lg">
          <div className="flex cursor-pointer items-center justify-between border-b px-4 py-3.5 transition-colors hover:bg-muted/50">
            <div>
              <h3 className="text-sm font-semibold">
                {plan?.duration1}
              </h3>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {plan?.duration1Info}
              </p>
            </div>

        
          </div>
          <div className="flex cursor-pointer items-center justify-between border-b px-4 py-3.5 transition-colors hover:bg-muted/50">
            <div>
              <h3 className="text-sm font-semibold">
               {plan?.duration2}
              </h3>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {plan?.duration2Info}
              </p>
            </div>

        
          </div>
          <div className="flex cursor-pointer items-center justify-between px-4 py-3.5 transition-colors hover:bg-muted/50">
            <div>
              <h3 className="text-sm font-semibold">
                {plan?.duration3}
              </h3>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {plan?.duration3Info}
              </p>
            </div>

          
          </div>

        </div>
      </div>

    </div>
        </section>
      </div>
    
  )
}
