"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import { authClient } from '@/lib/auth-client';
import { countryList, fitRavity, genderList, trainerMode, trainerSchema, trainerSchemaType, yearsLIst } from '@/lib/formSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { AnimatePresence, motion, type Variants } from "framer-motion";
import CertificateUploader from './CertificateUploader';
import ProfileUploader from './ProfileUploader';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import Home from '@/app/(public)/page';
import HomeLoader from '@/components/web/HomeLoader';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useImageStore } from '@/app/store/imageStore';
import Image from 'next/image';
import { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import React from 'react';
import { set } from 'zod';
import { useApplicationStore } from '@/app/store/applicationStore';
import { CheckCheck, Loader, Loader2, Search, X } from 'lucide-react';
import { formCsrfMiddleware } from 'better-auth/api';
import { checkAvailability } from '../actions';
import { SuccessButton } from '@/components/ui/SuccessButton';

export default function TrainerForm({userId}: {userId : string}) {

  const {submitApplication, submitLoader, success,checkBrand, checkLoader, checkRef, draft,
  setDraft,
  clearDraft,
} = useApplicationStore()
  

  const container: Variants ={
        hidden : {},
        visible : {
          transition: {staggerChildren : 0.1, delayChildren : 0.3}
        }
      }
      const item:Variants ={
        hidden : {
          x:20, opacity:0
        },
        visible:{
          x:0, opacity:1,
          transition : {
            duration: 0.3
          }
        }
      }
        const [open, setOpen] = React.useState(false)

        const {file, files} = useImageStore();

  const {data: session, isPending} = authClient.useSession()
  const form = useForm<trainerSchemaType>({
    resolver : zodResolver(trainerSchema),
    defaultValues : {
      name : session?.user.name,
      email: session?.user.email,
      DOB: new Date(`${new Date().getFullYear()-18}-${new Date().getMonth()+1}-${new Date().getDate()}`),
      specialization: "",
      certificates: [],
      bio: "",
      brand: "FITRAVITY",
      designation: "",
      social: "",
      picture: "",
      city: "",
      country: "India",
      panNumber: "",
      terms : false,
      experience : "0-1 years",
      gender: "Male"
    }
    
  });
  const hasRestoredDraft = React.useRef(false);
  useEffect(() => {

  if (hasRestoredDraft.current) {
    return;
  }

  if (Object.keys(draft).length > 0) {

    form.reset({
      ...draft,

      DOB: draft.DOB
        ? new Date(draft.DOB)
        : undefined,
    });

  }

  hasRestoredDraft.current = true;

}, []);
useEffect(() => {

  const subscription = form.watch((values) => {

    if (!hasRestoredDraft.current) {
      return;
    }

    setDraft(values);

  });

  return () => {
    subscription.unsubscribe();
  };

}, [form, setDraft]);

useEffect(() => {

  if (file.key) {
    form.setValue("picture", file.key);
  }

  if (files.length > 0) {
    form.setValue(
      "certificates",
      files
        .map((file) => file.key)
        .filter((key): key is string => Boolean(key))
    );
  }

}, [file, files, form]);

  const submitForm:SubmitHandler<trainerSchemaType> = (data)=>{
   submitApplication(data, userId)
             
  }
  useEffect(()=>{
    form.clearErrors("designation")
    form.setValue("designation", "")
  },[form.watch("brand")])
  return (
    
    <motion.div className='lg:px-20 px-2 py-10'>
      {isPending ? <HomeLoader /> :
    <Card className='py-10'>
      <CardHeader className='text-center'>
        <CardTitle >
          Application Form
        </CardTitle>
        <CardDescription>
        Please Fill up all the mandatory details*
        </CardDescription>
      </CardHeader>
       <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(submitForm)}>
          <FieldGroup className='grid grid-cols-2 gap-20'>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 flex flex-col lg:flex-row gap-4'>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Full Name*<span className='text-muted-foreground'>(Use your Legal Name)</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}

                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </motion.div>
             <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 flex flex-col lg:flex-row gap-4'>
            
               <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Gender
                    </FieldLabel>
                  
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
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
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {genderList.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            
            <Controller
  name="DOB"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="date">
        Date of Birth*
      </FieldLabel>

      <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      id="date"
      className="justify-start font-normal"
    >
      {field.value
        ? field.value.toLocaleDateString()
        : "Select date"}
    </Button>
  </PopoverTrigger>

  <PopoverContent
    className="w-auto overflow-hidden p-0"
    align="start"
  >
    <Calendar
      mode="single"
      selected={field.value}
      defaultMonth={field.value}
      captionLayout="dropdown"
      onSelect={(selectedDate) => {
        field.onChange(selectedDate);
        setOpen(false);
      }}
    />
  </PopoverContent>
</Popover>

      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )}
/>
            </motion.div>
            
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='col-span-2'>
            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    More About you*
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id={field.name}
                      placeholder="Short Impactfull Bio"
                      rows={6}
                      className="min-h-24 resize-none px-5"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/150 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                 
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div><motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2'>
            <Controller
              name="specialization"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Specialization*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className='bg-muted px-5'
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. nutritionist, yoga teacher etc"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2'>
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    City*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className='bg-muted px-5'
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. nutritionist, yoga teacher etc"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='col-span-2 lg:px-10'>
               <Controller
              name="experience"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Select Experience
                    </FieldLabel>
                    <FieldDescription>
                      *Please select the experience level you have. This will help us understand your background better.
                      <span><ul><li>*If your have no expereince please don't change the value or select "0-1 years"</li>
                      <li>*Make sure to add the certificates so that we can verify it</li>
                      </ul></span>
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
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
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {yearsLIst.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            </motion.div>
            
             <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2'>
            <Controller
              name="certificates"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Certificates <span className='text-muted-foreground'>(You may continue if you have no certificate)</span>
                  </FieldLabel>
                 <CertificateUploader />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2'>
            <Controller
              name="picture"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional portrait*
                  </FieldLabel>
                  <ProfileUploader />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
             <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2'>
            <Controller
              name="panNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    PAN CARD number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className='bg-muted px-5'
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. ABCDE1234F"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 lg:px-10'>
               <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Select Country
                    </FieldLabel>
                    <FieldDescription>
                      For best results, select the country you are based in.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
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
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {countryList.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            </motion.div>
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 lg:px-10'>
               <Controller
              name="brand"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Select Designation
                    </FieldLabel>
                    <FieldDescription>
                      Please select the Brand you are applying for

                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
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
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {trainerMode.map((designation) => (
                        <SelectItem key={designation} value={designation}>
                          {designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            </motion.div>

          {
            form.watch("brand") === "FITRAVITY" ? <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 lg:px-10'>
              <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Select Designation
                    </FieldLabel>
                    <FieldDescription>
                      Please select the designation you are applying for. This will help us understand your role better.
                      For more understanding of the roles, please refer to the <a href="/onboarding/roles-documentation" className='text-chart-4 underline'>Roles Documentation</a>
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
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
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {fitRavity.map((designation) => (
                        <SelectItem key={designation} value={designation}>
                          {designation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            </motion.div>: form.watch("brand") === "OWN BRAND" ?  <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 lg:px-10'>
               <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Brand Name*
                  </FieldLabel>
                  <div className='relative'>
                  <Input
                 
                    {...field}
                     onBlur={async (e) => {
    field.onBlur();
const res=  await checkBrand(field.value);

    if (!res?.success) {
      form.setError("designation", {
        type: "manual",
        message: res?.message,
      });
      
    } else {
      form.clearErrors("designation");
    }
  }}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                  {checkLoader ? <Loader2 className="absolute top-0 right-0 bottom-0 animate-spin"/> : success ? <CheckCheck className="absolute top-0 right-0 bottom-0 text-primary"/> : fieldState.invalid && <X className="absolute top-0 right-0 bottom-0"/>}
                  
                  
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </motion.div>:form.watch("brand") === "COACH" && <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='lg:col-span-1 col-span-2 lg:px-10'>
               <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    REFERRAL CODE
                  </FieldLabel>
                  <div className='relative'>
                  <Input
                    {...field}
                    onBlur={
                      async() =>{
                        field.onBlur();
                        const res = await checkRef(field.value)
                        if(!res?.success){
                          form.setError("designation", {
                            type: "manual",
                            message: res?.message
                          })
                        }else{
                          form.clearErrors("designation")
                        }
                      }
                    }
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                  {checkLoader ? <Loader2 className="absolute top-0 right-0 bottom-0 animate-spin"/> : fieldState.invalid ? <X className="absolute top-0 right-0 bottom-0"/> : success && <CheckCheck className="absolute top-0 right-0 bottom-0 text-primary"/>}
                 </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </motion.div>
          }
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='col-span-2'>
            <Controller
              name="social"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Social Media <span className='text-muted-foreground'>eg. Facebook, Youtube etc. (Optional)</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. https://www.instagram.com/username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /></motion.div>
            
            <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='col-span-2'>
              <Controller
  name="terms"
  control={form.control}
  render={({ field, fieldState }) => (
    <FieldSet className='flex'>
    
      <Field
        orientation="horizontal"
        data-invalid={fieldState.invalid}
        className="mt-4 flex justify-center items-center"
      >
        <motion.div  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container} className='flex justify-center items-center gap-2'>
        <Checkbox
        className='bg-muted-foreground/30'
          id="terms"
          checked={field.value}
          onCheckedChange={(checked) => field.onChange(!!checked)}
          aria-invalid={fieldState.invalid}
        />

        <FieldLabel htmlFor="terms" className="font-normal">
          I agree to the FitRavity onboarding <a href="/onboarding/terms" className='text-chart-4 font-bold underline'>Terms</a>
        </FieldLabel></motion.div>
      </Field>
 <motion.div variants={item} className='flex justify-center'>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}</motion.div>
    </FieldSet>
  )}
/>
            </motion.div>
            <CardFooter className='col-span-2 flex justify-center'>
              <Field className='max-w-[200px]'>
               {submitLoader? <AnimatedButton type='button' className='w-full' disabled ={submitLoader}><Loader className='animate-spin'/>Processing</AnimatedButton>: <AnimatedButton type='submit' className='w-full'>Submit</AnimatedButton>} 
               
              </Field>
            </CardFooter>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>}</motion.div>
  )
}
