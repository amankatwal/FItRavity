"use client"
import React, { useEffect } from 'react'

import { BookOpenText, GitBranch,
  Clock3,
  UsersRound,
  Target,
  Route, CalendarDays, ChartBarBig, ChartNoAxesCombined, ChevronRight, CircleCheck, Clock, Dumbbell, Salad, Send, Toolbox, Video} from 'lucide-react'
import Link from 'next/link'
import { GoGoal } from "react-icons/go";
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {  MdVerified } from "react-icons/md";
import { authClient } from '@/lib/auth-client'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { TbUserScreen } from "react-icons/tb";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useProgramForm } from '@/app/dashboard/plans/clientStore';
export default function PlanInfo({planId}: {planId:string}) {
     const {data:session} = authClient.useSession()
    const {plan,data, fetchPlanById, fetchPlansByOrgId, planLoader} = useProgramForm()
    useEffect(()=>{
        if(session?.user)
            fetchPlansByOrgId(session.user.id)
        fetchPlanById(planId)
    },[])
  return (<div className='pt-[10vh] overflow-x-hidden'>
    {planLoader ? <div className='bg-card/10 w-full h-screen flex justify-center items-center'>
        <h1 className='shimmer shimmer-color-primary text-primary/10 text-5xl font-semibold tracking-[0.5em] -rotate-3'>LOADING...</h1>
      </div> :
    <div><section className='px-4 sm:px-10 py-6 sm:py-10 flex flex-wrap gap-2 sm:gap-3 items-center text-sm'>
      <Link href="/dashboard"><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'>Dashboard</span></Link>
      <span className='text-muted-foreground'><ChevronRight size={15}/></span>
      <Link href="/dashboard/plans"><span className='text-muted-foreground hover:cursor-pointer hover:text-primary/50'>Plan</span></Link>
      <span><ChevronRight size={15}/></span><span>{plan?.name}</span>
    </section>
    <section className='flex flex-col lg:flex-row gap-8 lg:gap-10 px-4 sm:px-10 lg:px-20 py-6 sm:py-10 relative'>
      <div className='w-full lg:w-[80vh] lg:max-w-[52%]'>
        <Image width={1000} height={1000} className='w-full object-cover rounded-xl' src={`https://res.cloudinary.com/dwyvsmlx3/image/upload/w_1000,q_auto,f_auto/v1786440423/${plan?.planThumbnail}`} alt={plan?.name ?? 'Plan thumbnail'} />
      </div>
      <span className='flex flex-col gap-5 w-full min-w-0'>
        <h1 className='text-2xl sm:text-3xl font-bold flex gap-3 wrap-break-word'>{plan?.name}</h1>
        <div className='flex gap-4 sm:gap-10 items-start'>
          <Image width={1000} height={1000} className='w-25 h-25 object-cover rounded-full' src={`https://res.cloudinary.com/dwyvsmlx3/image/upload/w_500,h_500,c_fill,q_auto,f_auto/v1786440423/${data?.members[0].profileImage}`} alt='Curator'/>
          <div className='flex flex-col gap-2'>
            <span className='flex gap-1'><p className='text-sm font-bold'>{data?.curatorName}</p>{data?.members[0].certifications && <MdVerified className='text-blue-700' size={12}/>}</span>
            <span className='flex gap-1 text-sm text-muted-foreground'>{data?.members[0].certifications && <p>Certified</p>}<p>{data?.members[0].specialization}</p></span>
            <span className='flex gap-1 text-xs text-muted-foreground'>Exp: {data?.members[0].experience}</span>
          </div>
        </div>
        <div className='text-sm font-semibold'>{plan?.shortInfo}</div>
        <div className='w-full bg-chart-5/10 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-around gap-4 sm:gap-6 p-4 sm:py-5'>
          <span className='flex gap-2 sm:gap-5 items-center'>
            <ChartBarBig size={40} className='text-chart-2'/>
            <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>Level</h1>
              <p>{plan?.level}</p>
              </span>
             </span>
               <span className='flex gap-2 sm:gap-5 items-center'>
              
              <Clock size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Duration
              </h1>
              <p>{plan?.duration} days</p>
              </span>
             </span>
             {plan && parseInt(plan?.restDays) && 
             <span className='flex gap-2 sm:gap-5 items-center'>
             
              <Dumbbell size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Workout
              </h1>
              <p>{7-(parseInt(plan?.restDays))} days/week</p>
              </span>
             </span>
             } 
               
               <span className='flex gap-2 sm:gap-5 items-center'>
              
              <Toolbox size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Equipement
              </h1>
              <p>{plan?.equipment}</p>
              </span>
             </span>
             <span className='flex gap-2 sm:gap-5 items-center'>
              
              <GoGoal size={40} className='text-chart-2'/>
              <span className='text-sm font-bold'>
              <h1 className='text-muted-foreground'>
                Goal
              </h1>
              <p>{plan?.goal}</p>
              </span>
             </span>
            </div>
            <div className='w-full bg-chart-5/10 h-full grid grid-cols-1 sm:grid-cols-2 gap-5 py-5'>
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
                
                : <span className='flex flex-col sm:flex-row gap-4 sm:gap-10 justify-between sm:items-center mx-4 sm:mx-10'>
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
        <section className='grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-10 py-8 sm:py-10 gap-8 lg:gap-5 relative'>
          <div className='lg:col-span-2 flex flex-col gap-6 lg:gap-20'>
           <h1 className='text-xl sm:text-2xl font-semibold'>About This Program</h1>
           <p className='text-muted-foreground'>{plan?.description}</p>
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
        <section className='p-4 sm:p-10 flex flex-col gap-6 sm:gap-10'>
          <h1 className='text-xl sm:text-2xl font-semibold'>What is included</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10'>

         <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <BookOpenText className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Blog access <Badge className='shrink-0'>{plan?.blogspotAccess ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
              You'll be able to see articles from <span className='font-bold'>{data?.name.split(' ')}</span>
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className=' bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <CalendarDays className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Training Schedule <Badge className='shrink-0'>{plan?.trainingSchedule ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             <span className='font-bold'>{data?.name.split(' ')}</span> will post the training schedules and you can follow the schedule and update the progress for review
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <ChartNoAxesCombined className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Progreess Tracking <Badge className='shrink-0'>{plan?.progressTracking ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             Once you mark the training as completed it will be saved in the completed schedule and <span className='font-bold'>{data?.name.split(' ')}</span> will be able to check your progress and make the best training program for you.
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <Send className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Chat with Trainer <Badge className='shrink-0'>{plan?.chatAccess ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             Once you mark the training as completed it will be saved in the completed schedule and <span className='font-bold'>{data?.name.split(' ')}</span> will be able to check your progress and make the best training program for you.
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <Salad className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Nutrition Guide <Badge className='shrink-0'>{plan?.dietInstructions ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             With this plan you will also be able to get the proper instructions for the diet. While getting full control on your macros with our AI powered nutrition calculator will show you your daily calories intake and our trainer can look into it to give the best diet plan for you
            </CardDescription>
           </CardFooter>
          </Card>
          <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <Video className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>Detailed Videos <Badge className='shrink-0'>{plan?.trainingVideos ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             You will get the access of exclusive content that <span className='font-bold'>{data?.name.split(' ')}</span> will share in the form of media and elevate your knowledge on that
            </CardDescription>
           </CardFooter>
          </Card>
           <Card className='bg-chart-4/10 relative'>
           <CardHeader className='flex flex-col gap-3'>
            <TbUserScreen size={25} className='text-chart-4'/>
            <CardTitle className='flex items-start justify-between gap-2'>1 : 1 Session <Badge className='shrink-0'>{plan?.privateSession ? "Enabled" : "Disabled"}</Badge></CardTitle>
           </CardHeader>
           <CardFooter>
            <CardDescription>
             This special perk will allow you to have the conversation via video meeting to the Trainer where your trainer may get to know even better and give you exclusivity and will elevate your training experience. However The  timings and dates may vary.
            </CardDescription>
           </CardFooter>
          </Card>
          </div>
        </section>
        <section className='p-4 sm:p-10'>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <div className="rounded-xl border p-5 shadow-sm relative">
        <h2 className="mb-5 text-[16px] font-semibold">
          Program Overview
        </h2>

        <div className="space-y-3.5">
          <div className="grid grid-cols-[18px_minmax(90px,120px)_minmax(0,1fr)] sm:grid-cols-[18px_145px_1fr] items-center gap-3">
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

          <div className="grid grid-cols-[18px_minmax(90px,120px)_minmax(0,1fr)] sm:grid-cols-[18px_145px_1fr] items-center gap-3">
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

          <div className="grid grid-cols-[18px_minmax(90px,120px)_minmax(0,1fr)] sm:grid-cols-[18px_145px_1fr] items-center gap-3">
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


          <div className="grid grid-cols-[18px_minmax(90px,120px)_minmax(0,1fr)] sm:grid-cols-[18px_145px_1fr] items-center gap-3">
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

          <div className="grid grid-cols-[18px_minmax(90px,120px)_minmax(0,1fr)] sm:grid-cols-[18px_145px_1fr] items-center gap-3">
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
      
}
    </div>
  )
}
