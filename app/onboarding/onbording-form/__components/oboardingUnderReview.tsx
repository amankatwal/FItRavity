import React from 'react'
import { motion } from 'framer-motion'
import { useApplicationStore } from '@/app/store/applicationStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OnboardingUnderReview() {
  const {getUserApplication, applicationId, applicationStatus} = useApplicationStore()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
     <Card>
      <CardHeader>
        <CardTitle className='text-center'>
          Application submitted
        </CardTitle>
        <CardDescription className='text-center'>
          Your application id <span className='font-bold text-card-foreground'> {applicationId.slice(-8)} </span>is under process Please wait for 203 business days for our Brand Owner or Fitravity associate to review your case
        </CardDescription>
      </CardHeader>
      <CardContent className='text-center'>
        <CardTitle>
          Application id: {applicationId.slice(-8)}, Status: {applicationStatus}
        </CardTitle>
      </CardContent>
     </Card>
    </motion.div>
  )
}
