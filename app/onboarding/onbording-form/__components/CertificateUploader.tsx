
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudUpload, Divide, Trash2 } from 'lucide-react';
import Image from 'next/image';
import pdf from "@/public/pdf.png"
import React, { useCallback } from 'react'
import {FileRejection, useDropzone} from "react-dropzone";
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import {AnimatePresence, motion} from "framer-motion"
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useImageStore } from '@/app/store/imageStore';
import { useApplicationStore } from '@/app/store/applicationStore';
export default function CertificateUploader() {
  const {draft, removeCertificate}= useApplicationStore()
const { files, uploadFiles, deleteFiles, setFiles } = useImageStore()
const certificateFiles = [
  ...files,
  ...(
    draft.certificates?.filter(
        (key) => !files.some((file) => file.key === key)
      )
      .map((key) => ({
        id: key,
        key,
        file: undefined,
        objectURL: undefined,
        uploading: false,
        isDeleting: false,
        error: false,
      })) ?? []
  ),
];

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
      
      if(fileRejections.length>0){
      return toast.error(fileRejections[0].errors[0].message)
    }
     if(files.length >= 5){
    return toast.error("Maximum limit reached", {position: "top-center"})
  }
    if(acceptedFiles.length> 0){
      setFiles((files) =>[
        ...files,
        ...acceptedFiles.map((file)=>( {
        id: uuidv4(),
        file: file,
        error : false,
        isDeleting: false,
        objectURL : URL.createObjectURL(file),
        uploading: false,
   
      }))
     
       ])
    }
     acceptedFiles.forEach(uploadFiles)
  }, [files]);

          const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
            maxFiles: 5,
            maxSize: 5*1024*1024,
            accept: {
              "image/*": []
            }
          });
          
    
  return (
    <> 
    <Card {...getRootProps()} className={`bg-muted border-1 hover:border-primary border-dashed ${isDragActive ? 'border-primary bg-primary/10' : 'border-neutral bg-card'}`}>
        <input {...getInputProps()} />
        
           <CardHeader className={`flex flex-col items-center justify-center gap-5`}>
            <CardTitle>
            <CloudUpload /></CardTitle>
           <CardDescription className='font-bold'> Upload images here <span className='text-xs text-muted-foreground font-semibold'>(Max file size should be 5mb and should not exceed 5 files)</span></CardDescription>
           <AnimatedButton type='button'>Upload</AnimatedButton>
           </CardHeader>

    </Card>
    <div className='flex gap-3 justify-start'>
          {certificateFiles.map(file => <AnimatePresence><motion.div animate={{scale:1}} initial={{scale:0}} exit={{scale:0}}   key={file.id} className='relative group max-h-100 overflow-hidden'>
          {
            file.uploading || file.isDeleting ? <div className='bg-muted-foreground/50 absolute w-full h-full flex justify-center items-center'>
               <Spinner className='animate-spin text-card'/>
            </div> : <div className='hover:bg-black/30 w-full h-full  absolute z-10 flex justify-center items-center'><Button size="icon-sm" className='bg-red-400 text-red-950 absolute top-1 right-1 hover:cursor-pointer ' type='button' onClick={()=>{ if (!file.key) return;  deleteFiles(file.key); removeCertificate(file.key)}}><Trash2 className='text-destructive'/></Button></div>
          }  
          {file.file?.type === "application/pdf" ? <div className='flex justify-center items-center h-full w-full relative'>
            <div className='absolute bottom-0 text-center w-full bg-card-foreground text-card/70 font-semibold text-xs px-10'>
            {file.file.name}
            </div>
            <Image src={pdf} alt='PDF' width={150} className='object-cover h-full'
  height={50} />
          </div> :
    <Image src={file.objectURL ? file.objectURL! : `https://res.cloudinary.com/dwyvsmlx3/image/upload/v1786340011/${file.key}` } alt={'Loading'} width={150} className='object-cover h-full'
  height={50} />}
      </motion.div></AnimatePresence>)}</div>
    </>
  )
}
