"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import { AlertCircleIcon, Loader, Pencil, Plus, Search, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import React, { useEffect } from 'react'
import { usePlansRenderStore } from '../clientStore'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/app/hookes/useDebounce'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import Image from 'next/image'
import YogaHero from "@/public/Yoga.jpg"
import { ToggleTheme } from '../../__component/ToggleTheme'
export default function WelcomePlanPage() {
    const {data:session} = authClient.useSession()
    const [isOpen, setIsOpen] = React.useState(false)
    const {recomendationLoader,fetchInterestLoader,submitIntersetLoader, recomendations, fetchInterestRecomendation, submitIntrest, fetchInterest, interests, setIntrest, removeInterest} = usePlansRenderStore()
    const [recomdationBox, setRecomendationBox] = React.useState(false)
    const [keyword, setKeyword] = React.useState("")
    
    const debouncedKeyword = useDebounce(keyword, 500)
    const isDebouncing = keyword !== debouncedKeyword
const isSearching = isDebouncing || recomendationLoader
    useEffect(()=>{
      fetchInterest()
    },[submitIntrest])
    useEffect(()=>{
if(debouncedKeyword){
  fetchInterestRecomendation(debouncedKeyword)
}
    },[debouncedKeyword])
  return (
    <div className=' lg:mt-10 mt-5 px-5 lg:px-20'>
      {
        fetchInterestLoader ? <div className="flex items-center gap-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-50" />
      </div>
    </div> : 
        <div className='relative'>
          <div className='absolute hidden sm:top-5 sm:right-5 sm:block'>
            <ToggleTheme />
          </div>
          {session ? <div className='flex gap-5'>
            <div>
            
            <Avatar className="sm:h-20 sm:w-20 h-12 w-12 rounded-full">
                  <AvatarImage src={session.user.image ??`https://avatar.vercel.sh/${session?.user.email}`} alt={session?.user.name} />
                  <AvatarFallback className="rounded-full text-card sm:text-3xl text:lg bg-card-foreground">{session.user.name.split('')[0]}</AvatarFallback>
                </Avatar></div>
            <div className='flex flex-col gap-4'>
            <h1 className='sm:text-xl text-md font-semibold'>Welcome Back, <span className='text-primary'>{session?.user?.name.split(' ')[0]}</span></h1>
            <div className='flex gap-2 items-center'>
             {interests.length > 0 && <span className='text-xs font-semibold px-2 py-1 border border-primary/50/50/50 bg-primary/20'>
              {interests[0]}</span>}{interests.length>1 &&<span className='text-xs font-semibold px-1 py-1 border border-primary/50/50 bg-primary/20'>+{interests.length-1}</span>}
            <a className='text-chart-4 text-sm font-bold hover:cursor-pointer flex underline gap-1' onClick={()=> setIsOpen(true)}>{interests.length > 0 ? "Manage interests" : "Add Interests "}<Pencil size={12} /></a></div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className='sm:grid sm:grid-cols-4'>
          <div className='col-span-3 flex flex-col gap-10'>
          <DialogTitle>Add Interests</DialogTitle>
          <DialogDescription>
            Tell us what you are interested in so that So we can recomend the programs as per your interests
          </DialogDescription></div>
          <div className='flex items-end'>
            <Badge className='bg-chart-4/30 py-3 px-2'>Max 5 interests</Badge>
          </div>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2 relative">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            {interests.length >0 &&
            <div className='w-full px-1 py-2 flex flex-wrap gap-2'>
              {interests.map((value)=>
              <div className='rounded-full border-[0.01em] border-primary/50 px-3 py-1 flex gap-3 bg-primary/10 justify-between items-center text-sm font-semibold' key={value}>
              <span>{value}</span><AnimatedButton variant="secondary" size="icon-xs" className='rounded-full size-5' onClick={()=>removeInterest(value)}><X size={15}/></AnimatedButton></div>)}</div>}
            <Input
            value = {keyword}
            autoComplete="off"
            onFocus={()=>{setRecomendationBox(true);}}
            onBlur={() => {setRecomendationBox(false); fetchInterestRecomendation("");}}
            placeholder='Type an interest (eg. Yoga, Fat loss etc)'
            onChange={(e)=>{setKeyword(e.target.value)}}
              id="link"
            />
            
            {recomdationBox && (isSearching? <Card className='absolute top-full overflow-y-scroll bg-background w-full z-20'>
              <span className='px-5 italic text-sm font-semibold'>Searching...</span>
            </Card> : recomendations.length>0 && keyword.trim().length >2  ? <Card className='absolute top-full overflow-y-scroll max-h-[20vh] bg-background w-full z-20'>
              
              <CardHeader>
                <CardTitle>Add interests</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              
              <div>
              {recomendations.filter(
  (value) => !interests.includes(value)
).map((value) => <div key={value} className='px-10 py-3 flex gap-3 my-0 items-center hover:cursor-pointer hover:bg-primary/5 mx-2 rounded-full' onMouseDown={async()=>{await setIntrest(value); setKeyword("")}}><Search /><span>{value}</span></div>)}
                </div>
            </Card> : (recomendations.length === 0 && keyword.trim().length >2) && <Card className='absolute top-full bg-background w-full z-20'>
              <CardHeader>
                <CardDescription>No match found</CardDescription>
              </CardHeader>
              
            </Card>)}
            
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          {submitIntersetLoader ? <Button>Saving...<Loader className='animate-spin'/></Button>: <AnimatedButton onClick={async()=> {await submitIntrest(interests); setIsOpen(false)}}>Save Changes</AnimatedButton>}
          
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div>
        </div> : <div className='flex flex-col items-center gap-10'>
         <Alert className="max-w-6xl bg-primary/5 border-primary/50 text-primary">
      <AlertTitle>Logged Out!</AlertTitle>
      <AlertDescription>
        Sign up to get started and access the program from top tier certified Fitrainers
      </AlertDescription>
      <AlertAction>
      <Link href="/signup"><AnimatedButton variant="ghost" className='underline text-primary'>Sign up</AnimatedButton></Link></AlertAction>
    </Alert>
    <div className='relative'>
    <Image src={YogaHero} width={1200} height={300} alt='YogaHero' className='h-[50vh] object-cover object-[center_25%]'/>
    <div className='absolute w-full h-full bg-black/60 z-30 top-0'></div>
    </div>
    </div>
       }
        </div>
      }
        
    </div>
  )
}
