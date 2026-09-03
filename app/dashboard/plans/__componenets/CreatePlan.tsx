import { IconFolderCode } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import * as Icons from "lucide-react"
import {
  Select,
  SelectContent,

  SelectItem,

  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { addPlanSchema, addPlanType, currencyList, durationList, logoList, levelList } from "@/lib/formSchema"
import { Textarea } from "@/components/ui/textarea"
import { Info, Loader, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { useProgramForm } from "../clientStore";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import React from "react";
import PlanBox from "./PlanBox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export function CreatePlan() {
  const {data: session} = authClient.useSession()
  const [open, setOpen] = React.useState(false)
  const iconMap: Record<string, LucideIcon> = {
  Crown: Icons.Crown,
  Dumbbell: Icons.Dumbbell,
  Trophy: Icons.Trophy,
  Gem: Icons.Gem,
  Star: Icons.Star,
  Flame: Icons.Flame,
  Target: Icons.Target,
  Zap: Icons.Zap,
  Heart: Icons.Heart,
  Shield: Icons.Shield,
  Medal: Icons.Medal,
  Rocket: Icons.Rocket,
};
  const {submitPlan, submitPlanLoader, data} = useProgramForm()
   const form = useForm<addPlanType>({
    resolver: zodResolver(addPlanSchema),
    defaultValues: {
          name : "",
          description : "",
          currency: "INR",
          duration: "30",
          actualPrice: "",
          offerPrice : "",
          blogspotAccess : false,
          trainingSchedule: false,
          progressTracking: false,
          chatAccess: false,
          dietInstructions: false,
          trainingVideos: false,
          privateSession: false,
          planLogo: "Crown",
          shortInfo: "",
          achievements: [
  { value: "" },
  { value: "" },
  { value: "" },
],
              duration1: "",
              duration1Info: "",
              duration2: "",
              duration2Info: "",
              duration3: "",
              duration3Info: "",
              equipment:"",
              focusArea: "",
              goal: "",
              level: "Beginner",
              programStructure: "",
              programType: "",
              recomendedFor: "",
              restDays: ""
          
    },
  })
  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "achievements"
    })

 async function onSubmit(data: addPlanType) {
  if(session?.user.id)
   await submitPlan(data, session?.user.id)
  form.reset()
  setOpen(false)
  }
  return (
    <div>
      
{data && data?.plans.length > 0 ? <PlanBox setOpen = {setOpen} /> :
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Plans Posted</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any Plan yet. Get started by creating
          your first Plan.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
         <AnimatedButton onClick={()=>setOpen(true)}>Create Plan</AnimatedButton>
      </EmptyContent>
      
    </Empty>}
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="form-Plan" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger>
          
           
        </DialogTrigger>
        <DialogContent className="lg:max-w-3xl max-h-[90vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Add Details</DialogTitle>
            <DialogDescription>
              Please fill all the requred Fields for the Plan
            </DialogDescription>
          </DialogHeader>
          <Alert className="max-w-3xl border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <Icons.AlertTriangleIcon />
      <AlertTitle>Once the Plan is created It cannot be deleted</AlertTitle>
      <AlertDescription>
       Once a plan has been created, it cannot be deleted from the Database. However, you can edit and update the plan details at any time to keep the information accurate and up to date. You may also deactivate the plan for the time being.

      </AlertDescription>
    </Alert>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Plan Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter Plan name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-10">
              <Controller
              name="shortInfo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Short Info.
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Perfect for beginners"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="planLogo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Plan Logo
                  </FieldLabel>
                 <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Logo</SelectItem>
                      <SelectSeparator />
                      {logoList.map((logo) => {
  const Icon = iconMap[logo];

  return (
    <SelectItem key={logo} value={logo}>
      <div className="flex items-center gap-2">
        
        <span>{logo}</span>
        <Icon size={18} />
      </div>
    </SelectItem>
  );
})}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </div>
            <h1 className="text-xl font-semibold">Program Overview</h1>
            <div className="grid grid-cols-3 gap-5">
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
              name="restDays"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Rest Days
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. 2 days(Active recovery)"
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
            </div>
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
            <div className="grid grid-cols-4 gap-10">
           <Controller
              name="currency"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Currency
                  </FieldLabel>
                 <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Select Currency</SelectItem>
                      <SelectSeparator />
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Actual Price
                   <Tooltip>
      <TooltipTrigger><Info size={15}/></TooltipTrigger>
      <TooltipContent>
        <p>The price mentioned here will be the max price shown to the client</p>
      </TooltipContent>
    </Tooltip>
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="MRP of your course"
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Offer Price
                   <Tooltip>
      <TooltipTrigger><Info size={15}/></TooltipTrigger>
      <TooltipContent>
        <p>The price mentioned here will be the offer price shown to the client</p>
      </TooltipContent>
    </Tooltip>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Offer Price of your course"
                    autoComplete="off"
                  />
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Duration in days
                  </FieldLabel>
                 <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={(value) => field.onChange((value))}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Select Days</SelectItem>
                      <SelectSeparator />
                      {durationList.map((duration) => (
                        <SelectItem key={duration} value={duration}>
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
            
            <DialogTitle>Features</DialogTitle>
            <div className="grid grid-cols-2 gap-10">
            <Controller
              name="blogspotAccess"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Blog access
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="trainingSchedule"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Custom Training Schedule
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="progressTracking"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Progress Tracking
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="chatAccess"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Chat with me
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dietInstructions"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Diet Instructions
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="trainingVideos"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Training videos
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="privateSession"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   1 : 1 Session
                  </FieldLabel>
                    <Switch
                    className="hover:cursor-pointer"
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </div>
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
<h1 className="text-xl font-semibold">Different phases of Program</h1>
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
  <h1 className="text-xl font-semibold">Key points</h1>
  <div className="grid grid-cols-3 gap-5">
      <Controller
              name="equipment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Equipment required
                  </FieldLabel>
                  <Input
                    {...field}
                    
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Gym Access, Yoga-mat"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 
            <Controller
              name="goal"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Goal
                  </FieldLabel>
                  <Input
                    {...field}
                    
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Muscle gain, fat loss."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 
            <Controller
              name="level"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                   Level
                  </FieldLabel>
                 <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Select Level</SelectItem>
                      <SelectSeparator />
                      {levelList.map((level) => (
                        <SelectItem key={level} value={level}>
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
  </div>
          </FieldGroup>
          <DialogFooter>
             
            <DialogClose><AnimatedButton variant="outline" type="button">Cancel</AnimatedButton></DialogClose>
            {submitPlanLoader ? <AnimatedButton type="button" className="hover:cursor-not-allowed" disabled={submitPlanLoader}><Loader className="animate-spin"/></AnimatedButton> : <AnimatedButton type="submit" form="form-Plan">Create</AnimatedButton>}
            
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  )
}