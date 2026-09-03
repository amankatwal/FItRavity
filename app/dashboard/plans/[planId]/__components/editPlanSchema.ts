import { currencyList, durationList } from "@/lib/formSchema";
import z from "zod";

export const levelList = ["Beginner", "Intermediate", "Advanced"]

export const editPlanNameSchema = z.object({
   name : z.string().min(5, "Please Enter Plan name").max(50, "Name of the plan can't exceed by 50 words"),
  shortInfo: z.string().min(10, "Please add minimum 10 charcaters").max(200,"Characters Can't exceed by 200 characters"),
  level: z.enum(levelList),
  restDays: z.string().min(1, "Rest days is required."),
  equipment: z.string().min(1, "Equipment is required."),
  goal: z.string().min(1, "Goal is required."),
  currency: z.enum(currencyList),
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
  offerPrice: z
      .string()
      .min(1, "Please enter the valid Price")
      .regex(/^\d+$/, "Price must contain only numbers")
      .refine((value) => Number(value) >= 1, {
        message: "Price must be greater than 0",
      })
      .refine((value) => Number(value) <= 99999, {
        message: "Plan can't exceed ₹99,999",
      }),
      duration: z.enum(durationList)
}).refine(
    (data) => Number(data.offerPrice) <= Number(data.actualPrice),
    {
      message: "Offer price must be equal to or less than actual price",
      path: ["offerPrice"],
    }
  );
  export const editPlanInfoSchema = z.object({
    description : z.string().min(300, "Please describe the Plan in minimum 300 words detail"),
    achievements: z
      .array(
        z.object({
          value: z.string().min(1, "Achievement can't be empty"),
        })
      )
  });

  export const editPlanOverviewSchema = z.object({
        programStructure: z.string(),
        programType: z.string(),
        recomendedFor: z.string(),
        focusArea: z.string(),
  })
  export const editPlanDurationBreakdownSchema = z.object({
     duration1: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
        duration1Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
        duration2: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
        duration2Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
        duration3: z.string().min(10, "Atleast 10 characters").max(50,"Can't exceed 50 Characters"),
        duration3Info: z.string().min(30, "Atleast 30 characters").max(100,"Can't exceed 100 Characters"),
  })
export type editPlanNameSchemaType = z.infer<typeof editPlanNameSchema>
export type editPlanInfoSchemaType = z.infer<typeof editPlanInfoSchema>
export type editPlanOverviewSchemaType = z.infer<typeof editPlanOverviewSchema>
export type editPlanDurationBreakdownSchemaType = z.infer<typeof editPlanDurationBreakdownSchema>