import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect, unauthorized } from 'next/navigation'

export default async function EmailVerified() {
    const session = await auth.api.getSession({
       headers : await headers()
     })
    if(!session?.user) return unauthorized();
    if(!session.user.emailVerified) return redirect("/verify")
  return (
    <div>
      <div className = "w-full bg-card h-[7vh] flex font-bold lg:text-4xl text-2xl items-center py-5 px-10">
          <h1>
            FIT
          </h1>
          <h1 className='text-lime-500'>
            RAVITY
          </h1>
      </div>
    <div className='flex items-center justify-center h-[90vh]'>
      <div className='max-w-[70vh] px-10'>
        <div className=' py-10 flex gap-2 lg:text-3xl items-center justify-center text-lg'>
    
        
             <h1 className=' text-accent-foreground font-bold '>
             EMAIL
             </h1>
              <h1 className=' text-primary font-bold '>
              VERIFIED
             </h1>
             </div>
             <div className='py-20 flex flex-col gap-10 items-center justify-center'>
             <h1 className='text-muted-foreground lg:font-semibold lg:text- text-center'>
              Your email has been successfully verified.
             </h1>
           <AnimatedButton>
      Dashboard
    </AnimatedButton>
             </div>
      </div>
      
    </div></div>
  )
}
