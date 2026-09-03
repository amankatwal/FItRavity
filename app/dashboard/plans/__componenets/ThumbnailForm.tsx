"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { thumbnailSchema, thumbnailType } from '@/lib/formSchema'
import Thumbnail from './Thumbnail'
import { toast } from 'sonner'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { useProgramForm } from '../clientStore'

export default function ThumbnailForm() {
    const { thumbnail } = useProgramForm();

    const form = useForm<thumbnailType>({
    resolver: zodResolver(thumbnailSchema),
    defaultValues: {
      picture : "",
    },
  })

  function onSubmit(data: thumbnailType) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  React.useEffect(() => {

    if (thumbnail.key) {
      form.setValue("picture", thumbnail.key);
    }

  }, [thumbnail, form]);

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-10'>
          <FieldGroup>
            <Controller
              name="picture"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='flex justify-center text-2xl'>
                   Thumbnail
                  </FieldLabel>
                  <Thumbnail />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           
          </FieldGroup>
          
        </form>
  )
}