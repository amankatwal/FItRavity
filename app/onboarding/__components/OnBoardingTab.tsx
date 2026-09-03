import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUp, SearchCheck, UserRoundCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const systems = [
  {
    name: 'submit application',
    value: 'performance',
    icon: FileUp,
    content: (
      <>
        Fill up your details <Link href="onboarding/onbording-form"><Button variant="link" size="icon-sm" className='text-chart-4 hover:cursor-pointer'>Here</Button></Link>. Please make sure to full all the required details.
        Make sure your details are accurate so that we can assess your profile and application to give you best suitable work dashboard for you.
      </>
    )
  },
  {
    name: 'Wait for review',
    value: 'infra',
    icon: SearchCheck,
    content: (
      <>
        Our Induvidual <span className='text-card-foreground font-bold'>Brand Representative</span> will review your application and assess your qualification once approved you will get the Confirmation email.
        All the Brand representatives have different criteria for approval. If you want to register your own brand then our <span className='text-card-foreground font-bold'> Fitravity Representatives </span>will review your form
      </>
    )
  },
  {
    name: 'Set up Your Profile',
    value: 'security',
    icon: UserRoundCog,
    content: (
      <>
       Once your Application is approved You will receive confirmation email. You can start setting up the things
      </>
    )
  }
]

const OnBoardingTab = () => {
  return (
    <Tabs defaultValue='performance' className='gap-6 px-1 flex justify-center'>
      <div className='w-fit max-w-screen overflow-x-auto overflow-y-hidden scrollbar-hide py-0.5 my-auto'>
        <TabsList className='h-auto bg-transparent flex w-max justify-start gap-3 border-b p-0'>
          {systems.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none!'
            >
              <Icon size={24} />
              <span className='text-xs font-bold tracking-tight'>{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {systems.map(tab => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='animate-in fade-in slide-in-from-top-1 duration-500'
        >
          <div className='px-6 py-20 rounded-3xl border bg-muted/5 border-dashed'>
            <h4 className='mb-3 text-lg font-bold flex items-start gap-2'>
              <tab.icon size={20} className='text-primary shrink-0 mt-1' />
              {tab.name} 
            </h4>
            <p className='text-muted-foreground text-sm leading-relaxed max-w-lg'>{tab.content}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default OnBoardingTab
