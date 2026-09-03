
"use client"

import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { AlertTriangleIcon, Loader, Pencil } from "lucide-react"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import {
  currencyList,
  durationList,
  levelList,
} from "@/lib/formSchema"

import { useProgramForm } from "../../clientStore"
import { editPlanNameSchemaType } from "./editPlanSchema"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import React from "react"

export function EditPlanNameDialog() {
  const { plan, updatePlanNameByID, updatePlanLoader } = useProgramForm()
  const {data:session} = authClient.useSession()
  const form = useForm<editPlanNameSchemaType>({
    defaultValues: {
      name: "",
      shortInfo: "",
      level: "",
      duration: "",
      restDays: "",
      equipment: "",
      goal: "",
      offerPrice: "",
      actualPrice: "",
    },
  })

  useEffect(() => {
    if (!plan) return

    form.reset({
      name: plan.name || "",
      shortInfo: plan.shortInfo || "",
      level: plan.level || "",
      duration: String(plan.duration) || "",
      restDays: plan.restDays || "",
      equipment: plan.equipment || "",
      goal: plan.goal || "",
      offerPrice: String(plan.offerPrice || ""),
      actualPrice: String(plan.actualPrice || ""),
      currency: plan.currency || "",
    })
  }, [plan, form])

  async function onSubmit(values: editPlanNameSchemaType) {
    if(session?.user.id && plan?.id){
    await  updatePlanNameByID(session?.user.id, plan?.id, values)
    setOpen1(false)
    }
  }
const [open1, setOpen1] = React.useState(false);
  return (
    <Dialog open={open1} onOpenChange={setOpen1}>
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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Program Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter program name"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="shortInfo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shortInfo">
                    Program Description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="shortInfo"
                    aria-invalid={fieldState.invalid}
                    placeholder="Describe your program..."
                    className="min-h-28 resize-none"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Level
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="level"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">
                          Select Level
                        </SelectItem>

                        <SelectSeparator />

                        {levelList.map((level) => (
                          <SelectItem
                            key={level}
                            value={level}
                          >
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="duration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Duration
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="duration"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">
                          Select Days
                        </SelectItem>

                        <SelectSeparator />

                        {durationList.map((duration) => (
                          <SelectItem
                            key={duration}
                            value={duration}
                          >
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="restDays"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="restDays">
                      Rest Days
                    </FieldLabel>

                    <Input
                      {...field}
                      id="restDays"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. 2 days (Active recovery)"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="equipment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="equipment">
                      Equipment Required
                    </FieldLabel>

                    <Input
                      {...field}
                      id="equipment"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Gym access, Yoga mat"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </div>
            <Controller
              name="goal"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="goal">
                    Goal
                  </FieldLabel>

                  <Input
                    {...field}
                    id="goal"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Muscle gain, Fat loss"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
    
            <div className="grid gap-4 sm:grid-cols-3">
              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="currency">
                      Currency
                    </FieldLabel>

                    <Select {...field} aria-invalid={fieldState.invalid}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyList.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="actualPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="actualPrice">
                      Actual Price (₹)
                    </FieldLabel>

                    <Input
                      {...field}
                      id="offerPrice"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="3999"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="offerPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="offerPrice">
                      Offer Price (₹)
                    </FieldLabel>

                    <Input
                      {...field}
                      id="offerPrice"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="3999"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
