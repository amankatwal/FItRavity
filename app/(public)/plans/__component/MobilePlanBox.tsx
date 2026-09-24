
"use client"

import Image from "next/image"
import Test from "@/public/Yoga.jpg"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/AnimatedButton"

type PlanBoxProps = {
  plan: {
    id: string
    name: string
    offerPrice: number | string
    actualPrice?: number | string | null
    currency?: string | null
    planThumbnail?: string | null
    duration: number,
    level:string,
    organization: {
      id: string
      name: string
      logo?: string | null
    }
  }
}

export default function MobilePlanBox({ plan }: PlanBoxProps) {
  
  return (
     <div className="flex flex-col p-1 gap-1 my-5">
      <div className="flex gap-2">
      <Image
      className="max-w-lg h-11 object-cover"
        alt="Page"
        src={Test}
        width={70}
        height={50}
      />
    <div>
      <h1 className="text-xs text-card-foreground font-bold">
        {plan.name}
      </h1>
      <div className="mt-5 flex gap-3">
     <Badge variant="outline" className={`${plan.level === "Beginner" ? 'bg-primary/30' : "bg-chart-4/30"} px-2 py-1`}>{plan.level}</Badge>
<Badge
  variant="outline"
  className={`${
    plan.duration >= 80
      ? "bg-yellow-500/70"
      : plan.duration >= 60
        ? "bg-chart-4/30"
        : "bg-primary/30"
  } px-2 py-1`}
>
  {plan.duration} Days
</Badge>
     </div>
</div>
      </div>
      <div className="flex flex-col gap-4 mt-4 relative">
         <p className="text-xs font-semibold text-muted-foreground">
    {plan.organization.name}
  </p>
  <p className="text-md ">
    {plan.actualPrice === plan.offerPrice ? <span>{plan.currency} {plan.offerPrice}</span> : <span className="gap-3 flex items-center">
    <span>{plan.currency} {plan.offerPrice}</span><span  className="text-sm text-muted-foreground line-through">{plan.currency} {plan.actualPrice}</span></span>}
  </p>
   <AnimatedButton className="absolute bottom-0 right-0" size="xs">Enroll Now</AnimatedButton>
      </div>
      
    </div>
  )
}

