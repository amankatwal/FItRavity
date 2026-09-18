import { auth } from "@/lib/auth"
import { trainerSchema, trainerSchemaType } from "@/lib/formSchema"
import prisma from "@/lib/prisma"
import { standardProtection } from "@/lib/security"
import { headers } from "next/headers"
import { success } from "zod"


export const onboardingStatus = async (userId : string) => {
    const session = await auth.api.getSession({
            headers: await headers()
        })
     try {
        if(!session){
             return {success: false, message: "Session Expired! Please login again"}
        }else{
        const decision = await standardProtection(session?.user.id)
    if(decision.isDenied()){
        return {success: false, message: "Request Blocked"}
    }
    }
         const res = await prisma.trainerApplication.findMany({
    where : {
        userId : userId
    }
  })
  if(res.length > 0){
  return{ success: true, status: res[0].status, applicationId: res[0].id }
}
    } catch (error) {
        return{ success: false, message: "Invalid request"}
    }
 
}

export const submitApplication = async(data: trainerSchemaType, userId:string) =>{
    const validation = trainerSchema.safeParse(data)
    if(!validation.success){
        return { success: false, message: "Invalid Request" }
    }
   const session = await auth.api.getSession({
        headers: await headers()
    })
 try {
    if(!session){
         return {success: false, message: "Session Expired! Please login again"}
    }else{
    const decision = await standardProtection(session?.user.id)
if(decision.isDenied()){
    return {success: false, message: "Request Blocked"}
}
}
            const res = await prisma.trainerApplication.findMany({
    where : {
        userId : userId
    }
  })
  if(res.length > 0 && res[0].status === "PENDING"){
  return{ success: false, message: "Application is still un review, Please wait for the decision" }
}
const submitRes = await prisma.trainerApplication.create({
data: {
    userId : userId,
    fullName: validation.data.name,
    email: validation.data.email,
    gender: validation.data.gender,
    dob: validation.data.DOB,
    specialization: validation.data.specialization,
    bio:validation.data.bio,
    profileImage: validation.data.picture,
    city: validation.data.city,
    country: validation.data.country,
    panNumber: validation.data.panNumber,
    social: validation.data.social,
    brand : validation.data.brand,
    designation:validation.data.designation,
    experience: validation.data.experience,
    certifications: validation.data.certificates
}
})

return {success: true, message: `Application id# ${submitRes.id} submitted`, application: submitRes}
    } catch (err) {
        console.log(err)
    }
}

export const checkAvailability = async(brand: string)=>{
   const session = await auth.api.getSession({
        headers: await headers()
    })
 try {
    if(!session){
         return {success: false, message: "Session Expired! Please login again"}
    }else{
    const decision = await standardProtection(session?.user.id)
if(decision.isDenied()){
    return {success: false, message: "Request Blocked"}
}
}
        const res = await prisma.organization.findFirst({
        where : {
           name: brand
        }
    })
    if(res){
        return {success: false, message: `${brand} have been already taken by user`}
    }else{
        return {success: true, message: "No match found ready to claim"}
    }
    } catch (error) {
        console.log(error)
    }
    
}
export const verifyCode = async(code:string)=>{
   const session = await auth.api.getSession({
        headers: await headers()
    })
 try {
    if(!session){
         return {success: false, message: "Session Expired! Please login again"}
    }else{
    const decision = await standardProtection(session?.user.id)
if(decision.isDenied()){
    return {success: false, message: "Request Blocked"}
}
}
        const res = await prisma.organization.findFirst({
              where : {
                slug: code
              }
        })
        if(res){
            return { success: true, message : "Match found"}
        }else{
            return { success: false, message : "Please enter the valid code shared by Owner or if you have no code you can sign up using Fitravity Brand"}
        }
    } catch (err) {
        console.log(err)
    }
}