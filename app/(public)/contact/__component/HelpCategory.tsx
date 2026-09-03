import React from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { User } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const HelpCategory = () => {
  return (
    <div className='flex flex-col items-center lg:px-20 px-10 py-20 w-screen h-screen'>
<h1 className='text-center font-semibold text-3xl'>
        Search By Category
        </h1>
    
    <div className=' grid lg:grid-cols-3 grid-cols-1 gap-5 text-center'>
     <Card>
        <CardHeader>
        <CardTitle className=''> <User /></CardTitle>
<CardDescription>
 Account Settings and Security
</CardDescription>
        </CardHeader>
        <CardContent>
        Creating your FitRavity Account
        </CardContent>
     </Card>
    </div></div>
  )
}
