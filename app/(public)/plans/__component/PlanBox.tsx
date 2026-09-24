
"use client"

import Image from "next/image"
import Test from "@/public/Yoga.jpg"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Test2 from "@/public/IMG_20221016_110630.jpg"
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

export default function PlanBox({ plan }: PlanBoxProps) {
  
  return (
     <div className="flex flex-col gap-2 border-1 border-muted-foreground/20 p-5">
      <div className="p-3">
      <Image
      className="w-100 h-40 object-cover"
        alt="Page"
        src={Test}
        width={280}
        height={100}
      /></div>
      <div className="flex flex-col justify-between px-1">
        <div className="flex">
          <Image src={Test2} width={50} height={50} alt="Profile" className="rounded-full"/>
          <div className="ml-2">
          <h1 className="text-md font-bold">
            {plan.name}
          </h1>

          <p className="text-xs">
             {plan.organization.name}
          </p></div>
        </div>
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
     <div className="relative"> <p className="text-xl font-bold  mt-10">
    {plan.actualPrice === plan.offerPrice ? <span>{plan.currency} {plan.offerPrice}</span> : <span className="gap-3 flex items-center">
    <span>{plan.currency} {plan.offerPrice}</span><span  className="text-sm text-muted-foreground line-through">{plan.currency} {plan.actualPrice}</span></span>}
  </p>
  <AnimatedButton className="absolute bottom-0 right-0">Enroll Now</AnimatedButton>
  </div>
      </div>
    </div>
  )
}

