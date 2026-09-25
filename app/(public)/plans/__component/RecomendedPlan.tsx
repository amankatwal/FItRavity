"use client"
import React, { useEffect, useRef, useState } from 'react'
import { usePlansRenderStore } from '../clientStore'
import { authClient } from '@/lib/auth-client'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import PlanBox from './PlanBox'
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import MobilePlanBox from './MobilePlanBox'
import { Button } from '@/components/ui/button'


export default function RecomendedPlan() {
  const { data: session } = authClient.useSession()
  const { fetchPlanRecomendation, fetchMoreRecomendedPlan, haveMore, fetchMoreRecomendedPlanLoader, recomendedPlans, recomendedPlanLoader } = usePlansRenderStore()
  const carouselRef = useRef<HTMLDivElement>(null)
const shouldContinueScrolling = useRef(false)
  useEffect(() => {
    if (session?.user?.id) {
      fetchPlanRecomendation(session.user.id)
    }
  }, [session?.user?.id])
  const [skeletonCount, setSkeletonCount] = useState(6)

useEffect(() => {
  const handleResize = () => {
    setSkeletonCount(window.innerWidth < 768 ? 4 : 6)
  }

  handleResize()

  window.addEventListener("resize", handleResize)

  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])
  useEffect(() => {
  if (
    fetchMoreRecomendedPlanLoader ||
    !shouldContinueScrolling.current
  ) {
    return
  }

  const carousel = carouselRef.current

  if (!carousel) return

  const amount = carousel.clientWidth

  shouldContinueScrolling.current = false

  carousel.scrollBy({
    left: amount,
    behavior: "smooth",
  })
}, [fetchMoreRecomendedPlanLoader])
  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current

    if (!carousel) return
    if (direction === "right") {
    shouldContinueScrolling.current = true
  } else {
    shouldContinueScrolling.current = false
  }

    const amount = carousel.clientWidth

    carousel.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    })
  }
  const handleScroll = () => {
    const carousel = carouselRef.current

    if (!carousel) return

    const distanceFromEnd =
      carousel.scrollWidth -
      carousel.scrollLeft -
      carousel.clientWidth

    if (
      distanceFromEnd < 500 &&
      haveMore &&
      !fetchMoreRecomendedPlanLoader &&
      session?.user?.id
    ) {
      fetchMoreRecomendedPlan(session.user.id)
    }
  }

  if (recomendedPlanLoader) {
    return (

      <div className='sm:px-20 py-10 px-3'>
        <div className='mb-5 mt-10'>
<Skeleton className="h-4 w-1/3" />
        </div>

       <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
  {Array.from({ length: skeletonCount }).map((_, index) => (
    <Card key={index} className="w-full">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  ))}
</div></div>
    )
  }

  return (
    <div className='sm:px-20 py-10'>
      <section className='px-1 md:hidden py-10'>
<div className='flex flex-col justify-center'>
        <div className="flex items-center justify-between mb-5">
          <h1 className="sm:text-2xl text-lg font-semibold text-chart-3">
            Recommended for you
          </h1>
          <div className="flex gap-2 text-muted-foreground text-xs items-center font-bold">
            SWIPE <ChevronRight size={10}/>
          </div>
        </div>
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="
          grid
grid-rows-2
grid-flow-col
auto-cols-[80%]
         carousel 
          w-full
          gap-2
          overflow-x-auto
          scroll-smooth
        "
        >

          {recomendedPlans.map((plan) => (
            <div
              key={plan.id}
              className="
            carousel-item
              
            "
            >
              <MobilePlanBox plan = {plan}/>
            </div>
          ))}
                      {fetchMoreRecomendedPlanLoader && (
  <>
     <div className="carousel-item w-full mt-2">
      <div className="w-full grid grid-cols-2 gap-2">

        <Skeleton className="aspect-video w-full mb-2" />
        <div>
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 " />
        </div>
        
          <Skeleton className="h-4 w-2/3 mb-3 col-span-2" />
    
      </div>
    </div>
    <div className="carousel-item w-full mt-2">
      <div className="w-full grid grid-cols-2 gap-2">

        <Skeleton className="aspect-video w-full mb-2" />
        <div>
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 " />
        </div>
        
          <Skeleton className="h-4 w-2/3 mb-3 col-span-2" />
    
      </div>
    </div>
  </>
)}
        </div>
    
        </div>
      </section>
      <section className="hidden md:flex flex-col sm:px-20 px-3 py-10 w-full relative">
        <div className='relative'>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-chart-3">
            Recommended for you
          </h1>
          <div className="flex gap-2">
        <AnimatedButton
          size="icon-xs"
          onClick={() => scrollCarousel("left")}
          className="btn btn-circle btn-sm"
        >
          <ChevronLeft />
        </AnimatedButton>

        <AnimatedButton
          size="icon-xs"
          onClick={() => scrollCarousel("right")}
          className="btn btn-circle btn-sm"
        >
          <ChevronRight />
        </AnimatedButton>
      </div>
        </div>
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="
          
          carousel
          carousel-center
          w-full
          gap-4
          overflow-x-auto
          scroll-smooth
        "
        >

          {recomendedPlans.map((plan) => (
            <div
              key={plan.id}
              className="
              carousel-item
              w-full
              sm:w-1/2
              lg:w-1/5
            "
            >
              <PlanBox plan={plan} />
            </div>
          ))}
          
        </div>
       
        </div>
        
 <div className='absolute right-0 top-1/2'>
            {fetchMoreRecomendedPlanLoader && (
  <div className="flex justify-center items-center py-5">
   <Loader className='animate-spin' size={20}/>
  </div>
)}
          </div>
      </section>
    </div>
  )
}
