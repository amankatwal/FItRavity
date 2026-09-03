
"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import {
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  Globe,
  InfoIcon,
  MapPin,
  Send,
  User,
  User2,
} from "lucide-react"
import Approved from "@/public/Approved.png"
import Rejected from "@/public/Rejected.png"
import { useApplicationReviewStore } from "../clientStore"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { addPartnerSchema, addPartnerSchemaType, adminCommentSchema, adminCommmentType } from "@/lib/formSchema"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DryRun from "./DryRun"
import { useSearchParams } from "next/navigation"

const containerVariants :Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants :Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
}

export default function ApplicationFormat({
  appId,
}: {
  appId: string
}) {

  const commentForm = useForm<adminCommmentType>({
  resolver: zodResolver(adminCommentSchema),
  defaultValues:{
    adminComment: ""
  }
  })

  const submitForm = useForm<addPartnerSchemaType>({
    resolver: zodResolver(addPartnerSchema),
    defaultValues :{
      notes : "",
    }

  })
  
  const {
    applicationLoader,
    getApplicationById,
    data,
    adminName,
    createPartner,
    setAdminComment,
    rejectApplication
  } = useApplicationReviewStore();
  async function finalSubmit(
  data: addPartnerSchemaType,
  event?: React.BaseSyntheticEvent
) {
  const submitter = (event?.nativeEvent as SubmitEvent)
    ?.submitter as HTMLButtonElement;

  if (submitter?.value === "approve") {
    await createPartner(data.notes);
  }

  if (submitter?.value === "reject") {
    await rejectApplication(data.notes);
  }
}
 async function onSubmit(data:adminCommmentType ) {
    
    await setAdminComment(data.adminComment)
commentForm.setValue("adminComment", "")
  }
const params = useSearchParams()
  React.useEffect(() => {
    getApplicationById(appId)
  }, [appId])

  if (applicationLoader) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4 animate-spin" />
          Loading application...
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Application not found.
        </p>
      </div>
    )
  }

  const profileImage = `https://res.cloudinary.com/dwyvsmlx3/image/upload/${data.profileImage}`

  const formattedDob = data.dob
    ? new Date(data.dob).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not provided"

  const formattedCreatedAt = new Date(
    data.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const statusVariant =
    data.status === "APPROVED"
      ? "default"
      : data.status === "REJECTED"
        ? "destructive"
        : "secondary"

  return (
    <motion.div
      className="mx-auto w-full max-w-4xl py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden relative">
        <motion.div
          variants={itemVariants}
          className="border-b px-6 py-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Trainer Onboarding
              </p>

              <h1 className="mt-1 text-2xl font-semibold">
                New Trainer Application
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Application received on {formattedCreatedAt}
              </p>
            </div>

            <Badge variant={statusVariant}>
              {data.status}
            </Badge>

          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="px-6 py-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border bg-muted">

              <Image
                src={profileImage}
                alt={data.fullName}
                fill
                sizes="96px"
                className="object-cover"
              />

            </div>

            <div className="min-w-0">

              <h2 className="text-2xl font-semibold">
                {data.fullName}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {data.designation || "Trainer"}
                {" · "}
                {data.specialization}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">

                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {data.city}, {data.country}
                </span>

                {data.experience && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {data.experience}
                  </span>
                )}

              </div>

            </div>

          </div>
        </motion.div>

        <Separator />
        <motion.section
          variants={itemVariants}
          className="px-6 py-6"
        >
          <SectionHeading title="Personal Information" />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <InfoItem
              icon={<User className="h-4 w-4" />}
              label="Full Name"
              value={data.fullName}
            />

            <InfoItem
              icon={<User className="h-4 w-4" />}
              label="Gender"
              value={data.gender ?? "Not provided"}
            />

            <InfoItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Date of Birth"
              value={formattedDob}
            />

            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={`${data.city}, ${data.country}`}
            />

          </div>
        </motion.section>

        <Separator />
        <motion.section
          variants={itemVariants}
          className="px-6 py-6"
        >
          <SectionHeading title="Professional Information" />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <InfoItem
              icon={<Briefcase className="h-4 w-4" />}
              label="Specialization"
              value={data.specialization}
            />

            <InfoItem
              icon={<Clock3 className="h-4 w-4" />}
              label="Experience"
              value={data.experience ?? "Not provided"}
            />

            <InfoItem
              icon={<Building2 className="h-4 w-4" />}
              label="Brand"
              value={data.brand}
            />

            <InfoItem
              icon={<Briefcase className="h-4 w-4" />}
              label="Designation"
              value={data.designation}
            />

          </div>
        </motion.section>

        <Separator />

        <motion.section
          variants={itemVariants}
          className="px-6 py-6"
        >
          <SectionHeading title="About the Applicant" />

          <div className="mt-4 rounded-lg border bg-muted/30 p-4">

            <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {data.bio}
            </p>

          </div>
        </motion.section>

        <Separator />
        <motion.section
          variants={itemVariants}
          className="px-6 py-6"
        >
          <SectionHeading title="Certifications" />

          {data.certifications?.length > 0 ? (

            <div className="mt-4 space-y-2">

              {data.certifications.map(
                (certification, index) => (

                  <motion.div
                    key={`${certification}-${index}`}
                    variants={itemVariants}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <span className="flex items-center gap-5">
                    <Award className="h-5 w-5 shrink-0 text-muted-foreground" />
                     <h1 className="text-muted-foreground font-sm">Certificate {index+1}</h1>
                    <Image src={`https://res.cloudinary.com/dwyvsmlx3/image/upload/${certification}`} alt={`Certificate-${index}`} width={32} height={32}/>
                    </span>
                    <Button variant="link" className="hover:cursor-pointer" onClick={()=>window.open(`https://res.cloudinary.com/dwyvsmlx3/image/upload/${certification}`)}>View</Button>
                  </motion.div>

                )
              )}

            </div>

          ) : (

            <p className="mt-4 text-sm text-muted-foreground">
              No certifications provided.
            </p>

          )}

        </motion.section>

        <Separator />
        <motion.section
          variants={itemVariants}
          className="px-6 py-6"
        >
          <SectionHeading title="Verification Details" />
          <Alert className="my-5">
        <InfoIcon />
        <AlertTitle>Verify the Credentials of the applicant on <span><a className="text-primary flex gap-2" target="__blank" href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPAN/1">PAN CARD Portal<ExternalLink size={15}/></a></span></AlertTitle>
        <AlertDescription>
          Verify if the details are correct if not Reject the application with proper documentation,
          Once the Dry Run is intiated The pan Card will be encryped.
        </AlertDescription>
      </Alert>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            

            <InfoItem
              icon={<CreditCard className="h-4 w-4" />}
              label="PAN Number"
              value={<DryRun />}
            />
            

            <InfoItem
              icon={<Globe className="h-4 w-4" />}
              label="Social Profile"
              value={
                data.social ? (
                  <a
                    href={data.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    View Social Profile
                  </a>
                ) : (
                  "Not provided"
                )
              }
            />
            
          </div>
          { data.dryRun &&
          <motion.div className="my-5" initial={{y:-10, opacity: 0}} animate={{y:0, opacity:1}}>
            
          <InfoItem
              icon={<CheckCircle2 />}
              label="Risk Check Status"
              value={data.dryRunMessage}
            /></motion.div>}
        </motion.section>
        {(data.adminId || data.adminComment) && (
          <>
            <Separator />

            <motion.section
              variants={itemVariants}
              className="px-6 py-6"
            >
              <SectionHeading title="Admin Review" />

              {data.adminId && (
                <div className="mt-4 flex items-center gap-2 text-sm">

                  <User2 className="h-4 w-4" />

                  <span>
                    Assigned to: {adminName.split(" ")[0]}
                  </span>

                </div>
              )}



              {data.adminComment && (
                <div className="mt-4 rounded-lg border bg-muted p-4">

                  <p className="text-xs font-medium text-muted-foreground">
                   Most Recent Response to user
                  </p>

                  <p className="mt-2 whitespace-pre-line text-sm leading-6">
                    {data.adminComment}
                  </p>

                </div>
              )}

            </motion.section>
          </>
        )}
{data.status === "PENDING" &&
        <motion.div
          variants={itemVariants}
          className="border-t bg-muted/30 px-6 py-5"
        >
          <div className="text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
               <form id="form-rhf-demo" onSubmit={commentForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="adminComment"
              control={commentForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    send Text
                  </FieldLabel>
                  <div className="relative">
                  <Textarea
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Comment is mandatory, Welcome the user or if rejected Mention the reason of rejection"
                    autoComplete="off"
                  />
                  <AnimatedButton type="submit" variant="secondary" size="icon-sm" className="group absolute right-1 bottom-1"><Send className="group-hover:rotate-45 transition-transform"/></AnimatedButton>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           </FieldGroup>
        </form>

          </div>
        </motion.div>}
                      {data.notes && (
                <div className="mt-4 rounded-lg border bg-muted/40 p-4">

                  <p className="text-xs font-medium text-muted-foreground">
                    Admin Comment
                  </p>

                  <p className="mt-2 whitespace-pre-line text-sm leading-6">
                    {data.notes}
                  </p>

                </div>
              )}
              {data.status === "PENDING" &&
              
               <motion.div
          variants={itemVariants}
          className="border-t bg-muted/30 px-6 py-5"
        >
          <div className="text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
               <form id="form-rhf-submit" onSubmit={submitForm.handleSubmit(finalSubmit)}>
          <FieldGroup>
            <Controller
              name="notes"
              control={submitForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Add Internal note
                  </FieldLabel>
                  <div className="relative">
                  <Textarea
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Internal Note cannot be empty"
                    autoComplete="off"
                  />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           </FieldGroup>
           
          
            <div className="grid grid-cols-2 mt-5 gap-5 px-10">
            <AnimatedButton type="submit" value="approve">Approve</AnimatedButton>
            <Button type="submit" variant="destructive" value="reject" className="hover:cursor-pointer">Reject</Button>
           </div>
           
           
          
        </form>

          </div>
        </motion.div>
              }
         

        <motion.div
          variants={itemVariants}
          className="border-t bg-muted/30 px-6 py-5"
        >
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

            <span>
              Trainer Onboarding Application
            </span>

            <span className="font-mono">
              Application ID: {data.id}
            </span>

          </div>
        </motion.div>
        {  (data.status === "APPROVED" || data.status === "REJECTED") &&
            <div className="absolute right-10 bottom-60">
                 <Image src={data.status === "APPROVED" ? Approved : Rejected} alt="Status" width={200} height={200}/> 
            </div>}
      </Card>
    </motion.div>
  )
}


function SectionHeading({
  title,
}: {
  title: string
}) {
  return (
    <h3 className="text-sm font-semibold tracking-wide">
      {title}
    </h3>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="rounded-lg border p-4">

      <div className="flex items-center gap-2 text-muted-foreground">

        {icon}

        <span className="text-xs">
          {label}
        </span>

      </div>

      <div className="mt-2 break-words text-sm font-medium">
        {value}
      </div>

    </div>
  )
}

