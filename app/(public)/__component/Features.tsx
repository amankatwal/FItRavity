import { BrainCircuit, ChartNoAxesCombined, Dumbbell } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export const Features = () => {
  return (
    <div className='flex flex-col'>

    
    <div className='grid lg:grid-cols-3 grid-cols-1 px-5 py-20 gap-4 text-chart-4 w-full'>
      
          <motion.div initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }} whileHover={{scale : 1.01}}  className='flex flex-col gap-10 py-10 px-5 border-1 bg-card '>
            <Dumbbell />
            <h1 className='text-xl font-semibold text-primary-foreground'>
              CUSTOM ROUTINES
            </h1>
            <p className='text-muted-foreground text-sm'>
              Trainers assign daily workouts with sets, reps & rest timers.
            </p>
          </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }} whileHover={{scale : 1.01}}  className='flex flex-col gap-10 py-10 px-5 border-1 bg-card '>
            <BrainCircuit />
            <h1 className='text-xl font-semibold text-primary-foreground'>
              AI PLUS TRAINER
            </h1>
            <p className='text-muted-foreground text-sm'>
              Our AI will keep on tracking the meals that you consume all the day and keep you updated about macros which then verified by Certified Trainers
            </p>
          </motion.div>
             <motion.div initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }} whileHover={{scale : 1.01}}  className='flex flex-col gap-10 py-10 px-5 border-1 bg-card '>
            <ChartNoAxesCombined />
            <h1 className='text-xl font-semibold text-primary-foreground'>
              CERTIFIED TRAINERS
            </h1>
            <p className='text-muted-foreground text-sm'>
              All the Trainers are certified so that your efforts are result driven. 
            </p>
          </motion.div>
    </div>
  <div>
    
  </div>
    </div>
  )
}
