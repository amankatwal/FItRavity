
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
import { editPlanOverviewSchemaType } from "./editPlanSchema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import React from "react"

export function EditPlanOverviewdialog() {
  const { plan, updatePlanOverview, updatePlanLoader } = useProgramForm()
  const {data:session} = authClient.useSession()
  const form = useForm<editPlanOverviewSchemaType>({
    defaultValues: {
 programStructure: "",
        programType: "",
        recomendedFor: "",
        focusArea: ""
  }})
  useEffect(() => {
    if (!plan) return

    form.reset({
     programStructure: plan.programStructure || "",
        programType: plan.programType || "",
        recomendedFor: plan.recomendedFor || "",
        focusArea: plan.focusArea || ""
    })
  }, [plan, form])

  async function onSubmit(values: editPlanOverviewSchemaType) {
     if(session?.user.id && plan?.id)
   await updatePlanOverview(session?.user.id, plan?.id, values)
    setOpen3(false)
  }
const [open3, setOpen3] = React.useState(false);
  return (
    <Dialog open={open3} onOpenChange={setOpen3}>
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
                        name="programType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                             Program Type
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="eg. Muscle Building"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    
                                   <Controller
                                    name="recomendedFor"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                      <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                         Recomended For
                                        </FieldLabel>
                                        <Input
                                          {...field}
                                          id="form-rhf-demo-title"
                                          aria-invalid={fieldState.invalid}
                                          placeholder="eg. Beginner level trainees"
                                          autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                          <FieldError errors={[fieldState.error]} />
                                        )}
                                      </Field>
                                    )}
                                  />
                                  <Controller
                                    name="focusArea"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                      <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                         Focus Areas
                                        </FieldLabel>
                                        <Input
                                          {...field}
                                          id="form-rhf-demo-title"
                                          aria-invalid={fieldState.invalid}
                                          placeholder="eg. Strength and Endurance"
                                          autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                          <FieldError errors={[fieldState.error]} />
                                        )}
                                      </Field>
                                    )}
                                  />
                                  <Controller
                                    name="programStructure"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                      <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                         Program Structure
                                        </FieldLabel>
                                        <Input
                                          {...field}
                                          id="form-rhf-demo-title"
                                          aria-invalid={fieldState.invalid}
                                          placeholder="eg. Periodized training"
                                          autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                          <FieldError errors={[fieldState.error]} />
                                        )}
                                      </Field>
                                    )}
                                  />             
          

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

