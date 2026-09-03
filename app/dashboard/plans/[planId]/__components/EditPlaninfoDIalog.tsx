
"use client"

import { useEffect } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { AlertTriangleIcon, Loader, Pencil, Plus, X } from "lucide-react"

import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"


import { Textarea } from "@/components/ui/textarea"

import { useProgramForm } from "../../clientStore"
import { editPlanInfoSchemaType, editPlanNameSchemaType } from "./editPlanSchema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import React from "react"

export function EditPlaninfoDIalog() {
  const { plan, updatePlanInfoByID, updatePlanLoader } = useProgramForm()
  const {data:session} = authClient.useSession()
  const form = useForm<editPlanInfoSchemaType>({
    defaultValues: {
      description : "",
      achievements: [
  { value: "" },
  { value: "" },
  { value: "" },
],
    },
  })
const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "achievements"
    })
  useEffect(() => {
    if (!plan) return

    form.reset({
      description: plan.description || "",
      achievements: plan.achievements?.map((a) => ({ value: a })) || [
        { value: "" },
        { value: "" },
        { value: "" },
      ]
    })
  }, [plan, form])

  async function onSubmit(values: editPlanInfoSchemaType) {
     if(session?.user.id && plan?.id)
   await updatePlanInfoByID(session?.user.id, plan?.id, values)
setOpen2(false)
  }
const [open2, setOpen2] = React.useState(false);
  return (
    <Dialog open={open2} onOpenChange={setOpen2}>
      <DialogTrigger asChild>
        <AnimatedButton
          size="icon-sm"
          className="group"
          type="button"
        >
          <Pencil className="rotate-45 transition-transform group-hover:rotate-0" />
        </AnimatedButton>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Program</DialogTitle>

          <DialogDescription>
            Update your program details and click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
<Alert className="w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Important!! Only update fields you want to modify.</AlertTitle>
      <AlertDescription>
       Please do not remove the existing details if you don't wish to change them.
      </AlertDescription>
    </Alert>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
                          name="description"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="form-rhf-demo-title">
                               Description
                              </FieldLabel>
                              <Textarea
                                {...field}
                                className="h-64 overflow-y-scroll"
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Please describe your plan in more detail"
                                autoComplete="off"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <h1 className="text-xl font-semibold">What clients will achieve(min 3)</h1>
            <div className="grid grid-cols-3 gap-5">
              
 {fields.map((item, index) => (
    <Controller
      key={item.id}
      name={`achievements.${index}.value`}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>

          <FieldLabel htmlFor={`achievement-${index}`}>
            Achievement {index + 1}
          </FieldLabel>
          <div className="relative flex">
          <Input
            {...field}
            id={`achievement-${index}`}
            aria-invalid={fieldState.invalid}
            placeholder="eg. Build lean muscle"
            autoComplete="off"
          />
          {index > 2 && <X className="absolute right-0 hover:cursor-pointer hover:bg-muted" onClick={() => remove(index)} />}
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}

        </Field>
      )}
    />
    
  ))}
{fields.length <6 && <AnimatedButton
    type="button"
    variant="outline"
    onClick={() => append({ value: "" })}
  >
    <Plus size={16} />
    Add Achievement
  </AnimatedButton>}
                        </div>


          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <AnimatedButton
                type="button"
                variant="outline"
              >
                Cancel
              </AnimatedButton>
            </DialogClose>
{updatePlanLoader ? <Button><Loader className="animateSpin" />Saving...</Button> : <AnimatedButton
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Save Changes
            </AnimatedButton>}
            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
