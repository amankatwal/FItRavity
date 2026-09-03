"use client"

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudUpload, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback } from 'react'
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from 'sonner';
import { motion } from "framer-motion"
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useProgramForm } from '../clientStore';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function Thumbnail() {

  const { data: session } = authClient.useSession();

  const {
    data,
    thumbnail,
    setThumbnail,
    uploadThumbnail,
    deleteThumbnail,
  } = useProgramForm();

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: FileRejection[]
    ) => {

      if (fileRejections.length > 0) {
        toast.error(
          fileRejections[0].errors[0].message
        );

        return;
      }

      if (acceptedFiles.length > 0 && session) {

        const file = acceptedFiles[0];

        const objectURL = URL.createObjectURL(file);

        setThumbnail({
          file,
          isDeleting: false,
          objectURL,
          uploading: true,
        });

        await uploadThumbnail(
          file,
          session.user.id
        );
      }
    },
    [
      session,
      setThumbnail,
      uploadThumbnail
    ]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/*": []
    }
  });

  const hasThumbnail =
    !!data?.logo ||
    thumbnail.uploading ||
    thumbnail.isDeleting;

  return (
    <>
      {hasThumbnail ? (

        <Card className='flex justify-center items-center max-w-3xl mx-auto h-[30vh]'>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='overflow-hidden relative group'
          >

            {thumbnail.uploading || thumbnail.isDeleting ? (

              <div className='bg-muted-foreground/50 absolute z-20 w-full h-full flex justify-center items-center'>

                <Spinner className='animate-spin' />

              </div>

            ) : (

              <div className='bg-black/50 w-full h-full absolute z-10 flex justify-center items-center'>

                <AnimatedButton
                  size="icon-sm"
                  variant="destructive"
                  className='text-white absolute top-1 right-1 hover:cursor-pointer'
                  type='button'
                  onClick={async () => {

                    if (!data?.logo) return;

                    await deleteThumbnail(
                      data.logo
                    );

                  }}
                >
                  <Trash2 />
                </AnimatedButton>

              </div>

            )}
            <Image
              src={
                thumbnail.objectURL
                  ? thumbnail.objectURL
                  : `https://res.cloudinary.com/dwyvsmlx3/image/upload/v1786340011/${data?.logo}`
              }
              alt='Profile'
              width={300}
              height={300}
              style={{
                objectFit: "cover",
                objectPosition: "center"
              }}
            />

          </motion.div>

        </Card>

      ) : (

        <Card
          {...getRootProps()}
          className={`bg-muted border-1 hover:border-primary border-dashed h-[30vh] ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-neutral bg-card'
          } max-w-3xl mx-auto`}
        >

          <input {...getInputProps()} />

          <CardHeader className='flex flex-col items-center justify-center gap-5'>

            <CardTitle>
              <CloudUpload />
            </CardTitle>

            <CardDescription className='font-bold'>

              Upload your Thumbnail here

              <span className='text-xs text-muted-foreground font-semibold'>
                (Max file size should be 5mb)
              </span>

            </CardDescription>

          </CardHeader>

        </Card>
      )}
    </>
  )
}