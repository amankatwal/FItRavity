import { Button } from '@/components/ui/button'
import React from 'react'
import { useApplicationReviewStore } from '../clientStore';
import { Loader, Lock } from 'lucide-react';

export default function DryRun() {
     const {
        applicationLoader,
        getApplicationById,
        data,
        adminName,
        dryRun,
        dryRunLoader
      } = useApplicationReviewStore();
  return (
    <span className="flex items-center justify-between">
                <p>{data?.dryRun ? <div>Encrypted </div> : data?.panNumber  }</p>
                {dryRunLoader ? <Button className="hover:cursor-not-allowed animate spin" disabled={dryRunLoader}><Loader className='animate-spin'/></Button>: data?.dryRun ? <Lock /> : <Button className="hover:cursor-pointer" onClick={()=>data?.panNumber && dryRun(data.panNumber)}>
                DRY RUN</Button>}
                </span>
  )
}
