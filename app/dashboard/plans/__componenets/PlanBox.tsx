import React from 'react'
import { useProgramForm } from '../clientStore'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { ArrowUpRight, Check, Plus, SquareArrowUpRight, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { planIconMap } from '@/lib/planBox'
import { IconH1 } from '@tabler/icons-react'
import Link from 'next/link'

type PlanBoxProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PlanBox({setOpen} : PlanBoxProps) {
    const {data} = useProgramForm()
    const features = [
  { key: "blogspotAccess", label: "Blog Access" },
  { key: "trainingSchedule", label: "Custom Training Schedule" },
  { key: "progressTracking", label: "Progress Tracking" },
  { key: "chatAccess", label: "Chat with Me" },
  { key: "dietInstructions", label: "Diet Instructions" },
  { key: "trainingVideos", label: "Training Videos" },

] as const;

  return (
    <div className='relative'>
     <h1 className='text-xl font-semibold text-center mt-20'>Active Plans</h1>
     <div className='absolute top-0 right-10'>
     <Tooltip>
     <TooltipTrigger>
      <AnimatedButton size="icon-lg"  onClick={()=>setOpen(true) }><Plus /></AnimatedButton></TooltipTrigger>
      <TooltipContent side="left">
        
        <p className="text-muted">Create new plan</p>
      </TooltipContent></Tooltip></div>
      <div className='grid grid-cols-2 gap-20 mx-20 my-20'>
     {data?.plans.map((plan)=> {
      const Icon = planIconMap[plan.planLogo]
      return (<Card key={plan.id} className='relative'>
        
        <span className='absolute top-5 right-5 text-primary'><Icon size={50}/></span>
        <CardHeader>
          <CardTitle >{plan.name}</CardTitle>
          
        </CardHeader>
        <CardContent className='text-muted-foreground'>

          {plan.shortInfo}
        </CardContent>
        <CardContent>
    <ul className="space-y-3">
  {[...features]
    .sort((a, b) => Number(plan[b.key]) - Number(plan[a.key]))
    .map((feature) => {
      const enabled = plan[feature.key];

      return (
        <li
          key={feature.key}
          className="flex items-center gap-3"
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              enabled
                ? 'text-primary'
                : "text-gray-400"
            }`}
          >
            {enabled ? <Check size={12} /> : <X size={12} />}
          </span>

          <span
            className={
              enabled
                ? "text-foreground"
                : "text-muted-foreground line-through"
            }
          >
            {feature.label}
          </span>
        </li>
      );
    })}
</ul>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <span>
            {plan.offerPrice !== plan.actualPrice ? <span className='flex font-bold gap-4 items-center'> <h1 className='line-through text-muted-foreground text-xl'>{plan.currency} {Number(plan?.actualPrice).toLocaleString("en-US")}</h1> <h1 className='text-chart-2 text-3xl'>{plan.currency} {Number(plan?.offerPrice).toLocaleString("en-US")}</h1></span>:
             <h1 className='text-3xl font-bold text-chart-2'>{plan.currency} {Number(plan?.actualPrice).toLocaleString("en-US")}</h1>}
          </span>
          <Link href={`/dashboard/plans/${plan.id}`}><AnimatedButton className='group'>More Info<ArrowUpRight  className='group-hover:rotate-45 transition-transform duration-300'/></AnimatedButton></Link>
        </CardFooter>
     </Card>)})}</div>
    </div>
  )
}
