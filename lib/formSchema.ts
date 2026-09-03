import { Currency } from "lucide-react";
import z from "zod";
export const genderList = ["Male", "Female", "Others"] as const
export const trainerMode = ["FITRAVITY", "OWN BRAND", "COACH"] as const
export const countryList = ["India"] as const
export const yearsLIst = ["0-1 years", "1-2 years", "2-3 years", "3-4 years", "4-5 years", "5-6 years", "6-7 years", "7-8 years", "8-9 years", "9-10 years", "10+ years"]
export const fitRavity = ["FITRAINER"]
export const currencyList = ["₹"]
export const durationList = ["30","90","180", "365"]
export const logoList = [ "Dumbbell",
  "Crown",
  "Trophy",
  "Gem",
  "Star",
  "Flame",
  "Target",
  "Zap",
  "Heart",
  "Shield",
  "Medal",
  "Rocket",] as const
  export const levelList = ["Beginner", "Intermediate", "Advanced"]
export const trainerSchema = z.object({
    name : z.string().min(3, "Name must have atleast 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    DOB: z.date().min(new Date("1900-01-01"), "Date of Birth must be after January 1, 1900"),
    specialization : z.string().min(3,"Please enter The valid specialization"),
    certificates : z.array(z.string()).optional(),
    gender : z.enum(genderList),
    bio: z.string().min(100, "Please make sure to enter atleast 100 Characters").max(500, "Characters can't exceed the count beyond 500"),
    panNumber : z.string().min(10,"Please enter the valid pan card info").regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid Pan card Format"),
    social : z.string().optional(),
    picture : z.string().min(1,"Please add your profile Picture"),
    city: z.string().min(1, "Please enter your city"),
    country : z.enum(countryList),
    brand : z.enum(trainerMode),
        designation: z.string().min(1),
        experience : z.enum(yearsLIst),
    terms : z.boolean().refine((val) => val === true, "You must agree to the terms and conditions")
});
export const adminCommentSchema = z.object({
    adminComment : z.string().min(10, "Please enter atleast 10 CHaracters")
})
export const addPartnerSchema = z.object({
    notes : z.string().min(10, "Please enter atleast 10 CHaracters")
})
export const applicationSearch = z.object({
    email: z.string().email("Please enter valid Email")
})
export const thumbnailSchema = z.object({
    picture : z.string().min(1,"Please add your Thumbnail Picture"),
})
export const addPlanSchema = z.object({
    name : z.string().min(5, "Please Enter Plan name").max(50, "Name of the plan can't exceed by 50 words"),
    description : z.string().min(300, "Please describe the Plan in minimum 300 words detail"),
    currency: z.enum(currencyList),
    duration: z.enum(durationList),
    shortInfo: z.string().min(10, "Please add minimum 10 charcaters").max(200,"Characters Can't exceed by 200 characters"),
    planLogo : z.enum(logoList),
    actualPrice: z
    .string()
    .min(1, "Please enter the valid Price")
    .regex(/^\d+$/, "Price must contain only numbers")
    .refine((value) => Number(value) >= 1, {
      message: "Price must be greater than 0",
    })
    .refine((value) => Number(value) <= 99999, {
      message: "Plan can't exceed ₹99,999",
    }),
    offerPrice : z
    .string()
    .min(1, "Please enter the valid Price")
    .regex(/^\d+$/, "Price must contain only numbers")
    .refine((value) => Number(value) >= 1, {
      message: "Price must be greater than 0",
    })
    .refine((value) => Number(value) <= 99999, {
      message: "Plan can't exceed ₹99,999",
    }),
    blogspotAccess : z.boolean(),
    trainingSchedule: z.boolean(),
    progressTracking: z.boolean(),
    chatAccess: z.boolean(),
    dietInstructions: z.boolean(),
    trainingVideos: z.boolean(),
    privateSession: z.boolean(),
    achievements: z
  .array(
    z.object({
      value: z.string().min(1, "Achievement can't be empty"),
    })
  )
  .min(3, "Please add at least 3 achievements"),
    duration1: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
    duration1Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
    duration2: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
    duration2Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
    duration3: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
    duration3Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
    equipment:z.string(),
    focusArea: z.string(),
    goal: z.string(),
    level: z.enum(levelList),
    programStructure: z.string(),
    programType: z.string(),
    recomendedFor: z.string(),
    restDays: z.string()
  }).refine(
    (data) => Number(data.offerPrice) <= Number(data.actualPrice),
    {
      message: "Offer price must be equal to or less than actual price",
      path: ["offerPrice"],
    }
  );
export type addPlanType = z.infer<typeof addPlanSchema>
export type thumbnailType = z.infer<typeof thumbnailSchema>
export type adminCommmentType = z.infer<typeof adminCommentSchema>
export type trainerSchemaType = z.infer<typeof trainerSchema>
export type addPartnerSchemaType = z.infer<typeof addPartnerSchema>
export type applicationSearchType = z.infer<typeof applicationSearch>