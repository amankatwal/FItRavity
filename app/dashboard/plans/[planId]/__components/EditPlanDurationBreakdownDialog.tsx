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



import { useProgramForm } from "../../clientStore"
import { editPlanDurationBreakdownSchemaType, editPlanOverviewSchemaType } from "./editPlanSchema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import React from "react"
import { Textarea } from "@/components/ui/textarea"

export function EditPlanDurationBreakdownDialog() {
  const { plan, updatePlanDurationBreakdown, updatePlanLoader } = useProgramForm()
  const {data:session} = authClient.useSession()
  const form = useForm<editPlanDurationBreakdownSchemaType>({
    defaultValues: {
      duration1: "",
      duration1Info: "",
      duration2: "",
      duration2Info: "",
      duration3: "",
      duration3Info: ""
  }})
  useEffect(() => {
    if (!plan) return

    form.reset({
    duration1: plan.duration1 || "",
      duration1Info: plan.duration1Info || "",
      duration2: plan.duration2 || "",
      duration2Info: plan.duration2Info || "",
      duration3: plan.duration3 || "",
      duration3Info: plan.duration3Info || ""
    })
  }, [plan, form])

  async function onSubmit(values: editPlanDurationBreakdownSchemaType) {
     if(session?.user.id && plan?.id)
   await updatePlanDurationBreakdown(session?.user.id, plan?.id, values)
    setOpen4(false)
  }
const [open4, setOpen4] = React.useState(false);
  return (
    <Dialog open={open4} onOpenChange={setOpen4}>
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
<div className="grid grid-cols-3 gap-2">
    <div className="flex flex-col gap-5">
      <Controller
              name="duration1"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Duration 1
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Week 1-2 Foundation Phase 1"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration1Info"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Info
                  </FieldLabel>
                  <Textarea
                    {...field}
                    className="h-34"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Focus on building strength"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    </div>
    <div className="flex flex-col gap-5">
      <Controller
              name="duration2"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Duration 2
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Week 2-3 Progression Phase"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration2Info"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Info
                  </FieldLabel>
                  <Textarea
                    {...field}
                    className="h-34 "
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Increase intensity and volume for muscle growth"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    </div>
    <div className="flex flex-col gap-5">
      <Controller
              name="duration3"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Duration 3
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Week 3 onwards Peak phase"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration3Info"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Info
                  </FieldLabel>
                  <Textarea
                    {...field}
                    className="h-34"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Push your limits and peak results"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    </div>
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