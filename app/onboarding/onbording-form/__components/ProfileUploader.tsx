
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudUpload, Divide, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback } from 'react'
import {FileRejection, useDropzone} from "react-dropzone";
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import {AnimatePresence, motion} from "framer-motion"
import axios from "axios";
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useImageStore } from '@/app/store/imageStore';
import { useApplicationStore } from '@/app/store/applicationStore';
export default function ProfileUploader() {
 
  const {file, uploadFile, deleteFile, setFile} = useImageStore();
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if(fileRejections.length>0){
        return toast.error(fileRejections[0].errors[0].message)
      }
      if(acceptedFiles.length> 0){
        const file = acceptedFiles[0]
        setFile(
       {  id: uuidv4(),
          file: file,
          error : false,
          isDeleting: false,
          objectURL : URL.createObjectURL(file),
          uploading: false}
         )
      }
       acceptedFiles.forEach(uploadFile)
    }, [file]);

          const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
            maxFiles: 1,
            multiple: false,
            maxSize: 5*1024*1024,
            accept: {
              "image/*": []
            }
          });
    const {draft, removeProfile}= useApplicationStore()
  const profileHero =
  file.file
    ? file
    : draft.picture
      ? {
          id: draft.picture,
          key: draft.picture,
          file: null,
          objectURL: undefined,
          uploading: false,
          isDeleting: false,
          error: false,
        }
      : null;
  return (
    <> 
    {profileHero ? <Card className='flex justify-center items-center'>
        <motion.div initial={{scale:0}} animate={{scale:1}} className='lg:max-h-[20vh] overflow-hidden relative group'>
            {
                       profileHero.uploading || profileHero.isDeleting ? <div className='bg-muted-foreground/50 absolute w-full h-full flex justify-center items-center'>
                          <Spinner className='animate-spin'/>
                       </div> : <div className='bg-black/50 w-full h-full  absolute z-10 flex justify-center items-center'><Button size="icon-sm" variant="destructive" className='text-white absolute top-1 right-1 hover:cursor-pointer ' type='button' onClick={()=>{if(!profileHero.key) return; deleteFile(profileHero.key); removeProfile()}}><Trash2 /></Button></div>
                     }  
        <Image src={profileHero.objectURL ?? `https://res.cloudinary.com/dwyvsmlx3/image/upload/v1786340011/${profileHero.id}`} alt='Profile' width={200} height={20} objectFit='cover' objectPosition='center'/>
        
        </motion.div>
    </Card>:
     <Card {...getRootProps()} className={`bg-muted border-1 hover:border-primary border-dashed ${isDragActive ? 'border-primary bg-primary/10' : 'border-neutral bg-card'}`}>
       <input {...getInputProps()} />
        
           <CardHeader className={`flex flex-col items-center justify-center gap-5`}>
            <CardTitle>
            <CloudUpload /></CardTitle>
           <CardDescription className='font-bold'> Upload your portrait here <span className='text-xs text-muted-foreground font-semibold'>
           (Max file size should be 5mb)</span></CardDescription>
           <AnimatedButton type='button'>Upload</AnimatedButton>
           </CardHeader>

    </Card>
    }
   
    </>
  )
}
