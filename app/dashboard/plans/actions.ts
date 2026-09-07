"use server"
import { addPlanType } from "@/lib/formSchema"
import prisma from "@/lib/prisma"
import { toast } from "sonner"
import { success } from "zod"
import { editPlanDurationBreakdownSchemaType, editPlanInfoSchemaType, editPlanNameSchemaType, editPlanOverviewSchemaType } from "./[planId]/__components/editPlanSchema"
import { createPlanChunks, generatePlanEmbedding } from "@/lib/openAI"
import { randomUUID } from "crypto"


export const fetchPlansByOrgIdAction =async(userId: string)=>{
    if(!userId){
        return {success: false, message: "Invalid Request PLease try again later"}
    }
    try {
       
        const res= await prisma.organization.findFirst({
            where : {
                ownerId: userId,
            },
            include:{
                plans: true,
                members:{
                    where:{
                          role: "Owner"
                    },
                    select:{
                      id: true,
organizationId: true,
userId: true,
role: true,
bio : true,
experience: true,
profileImage: true,
specialization: true,
certifications: true
                    }
                }
            }
        })
       const  nameRes = await prisma.user.findUnique({
            where : {
                id: res?.ownerId
            }
        })
        if(res){
            return {success: true, messsage: "You updated Thumbnail",  data: {
      ...res,

      plans: res.plans.map((plan) => ({
        ...plan,
        actualPrice: Number(plan.actualPrice),
        offerPrice: Number(plan.offerPrice),
      })),
      curatorName: nameRes?.name,
    },}
        }
        else return {success: false, message: "Please add the image in the thumbnail"}
    } catch (err) {
        return {success: false, message: "Invalid request"}
    }
}

export const uploadFileAction = async(key:string, userId: string)=>{
    if(!key){
        return {success: false, message: "Invalid request"}
    }
    try {
        const res= await prisma.organization.update({
            where: {
                ownerId: userId,
            },
            data: {
                logo: key
            }
        })
    } catch (err) {
     toast.error("Invalid Request")
    }
}
export const deleteFileAction = async(key: string) =>{
    if(!key){
        return {success: false, message: "Invalid Request"}
    }
    try {
        await prisma.organization.update({
            where : {
                logo: key,
            },
            data: {
                logo: null
            }
        })
        return {success: true, message: "Thumbanial deleted Successfully"}
    } catch (err) {
        return {success: false, message: "Invalid request"}
    }
}
export const submitPlanAction = async(data:addPlanType, userId:string)=>{
    if(!data || !userId){
        return {success: false, message: "Invalid Request"}
    }
    try {
        const res = await prisma.organization.findFirst({
            where :{
                ownerId: userId,
            }
        })
        
        if(!res?.id){
            return { success: false, message: "Session error. PLease logout and login again"}
        }
        
        const planRes = await prisma.plan.create({
            data:{
                organizationId: res.id,
                name: data.name,
                description: data.description,
                actualPrice: Number(data.actualPrice),
                offerPrice: Number(data.offerPrice),
                currency: data.currency,
                duration: Number(data.duration),
                blogspotAccess:data.blogspotAccess,
                trainingSchedule: data.trainingSchedule,
                chatAccess: data.chatAccess,
                dietInstructions: data.dietInstructions,
                trainingVideos: data.trainingVideos,
                privateSession:data.privateSession,
                planLogo: data.planLogo,
                shortInfo:data.shortInfo,
                achievements:data.achievements.map((item) => item.value),
                duration1:data.duration1,
                duration1Info:data.duration1Info,
                duration2:data.duration2,
                duration2Info:data.duration2Info,
                duration3:data.duration3,
                duration3Info:data.duration3Info,
                equipment:data.equipment,
                focusArea:data.focusArea,
                goal:data.goal,
                level:data.level,
                programStructure:data.programStructure,
                programType:data.programType,
                recomendedFor:data.recomendedFor,
                restDays:data.restDays,
                isActive:true,
                updatedAt:new Date()
            }
        })
   const vectorResults = []
    const chunks = await createPlanChunks(data, planRes.isActive, planRes.id)
    for (let i=0; i < chunks.length; i++){
const embedding = await generatePlanEmbedding(chunks[i])
    const vectorString = `[${embedding.join(",")}]`;
    const vectorId = randomUUID();
  const vectorRes =  await prisma.$executeRaw`INSERT INTO plan_vector ("id","planId","content", "embedding", "chunkIndex") VALUES (${vectorId}, ${planRes.id}, ${chunks[i]}, ${vectorString}, ${i+1})`
   vectorResults.push(vectorRes) 
}
    

  if(!planRes || vectorResults.length === 0){
    return {success: false, message: "Invalid Request"}
  }
  return {success: true, message: "New Plan created Successfully", data: planRes}
    } catch (err) {
       console.log(err) 
    }
}
export const getPlanByIdAction =async(planId:string)=>{
    if(!planId){
        return {success: false, message:"Something went wrong."}
    }
try {
    const res = await prisma.plan.findUnique({
        where:{
            id:planId
        }
    })
    if(!res){
        return {success: false, message: "Something went wrong"}
    }
    return{
        success: true, data: res
    }
} catch (err) {
   return {success: false, message: "Something went wrong"}
}
}

export const updatePlanNameAction = async(userId:string, planId:string, data: editPlanNameSchemaType)=>{
    if(!planId){
        return {success: false, message:"Something went wrong."}
    }
  const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    }  
    try {
        const res = await prisma.plan.update({
            where:{
                id: planId
            },
            data:{
                name: data.name,
                shortInfo: data.shortInfo,
                level: data.level,
                restDays: data.restDays,
                equipment: data.equipment,
                goal: data.goal,
                actualPrice: Number(data.actualPrice),
                offerPrice: Number(data.offerPrice),
                duration: Number(data.duration),
                currency: data.currency,
                isActive:false,
            }
        })
        return {success: true, message: "Plan name updated successfully", data: res}
    } catch (err) {
        return {success: false, message: "Something went wrong"}
    }
}

export const updatePlanInfoAction = async(userId:string, planId:string, data: editPlanInfoSchemaType)=>{
    if(!planId){
        return {success: false, message:"Something went wrong."}
    }
  const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
try {
    const res = await prisma.plan.update({
            where:{
                id: planId
            },
            data:{
                description: data.description,
                achievements:data.achievements.map((item) => item.value),
                isActive:false,
            }
        })
        return {success: true, message: "Plan info updated successfully", data: res}
} catch (err) {
    return {success: false, message: "Something went wrong"}
}
}
export const updatePlanFeaturesAction = async(userId:string, planId:string,feature:string, value:boolean)=>{
    if(!planId){
        return {success: false, message:"Something went wrong."}
    }
  const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
    try {
        const res = await prisma.plan.update({
            where:{
                id: planId  
            },
            data: {
                [feature]: value,
                isActive:false,
            }
            }
        )
        return {success: true, message: "Plan features updated successfully", data: res}
    } catch (err) {
        console.log(err)
        return {success: false, message: "Something went wrong"}
    }
}
export const updatePlanOverviewAction = async(userId:string, planId:string, data: editPlanOverviewSchemaType)=>{
    if(!planId){
        return {success: false, message:"Something went wrong."}
    }
  const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
    try {
        const res= await prisma.plan.update({
            where:{
                id: planId
            },
            data:{
                programStructure: data.programStructure,
                programType: data.programType,
                recomendedFor: data.recomendedFor,
                focusArea: data.focusArea,
                isActive:false,
            }
        })
        return {success: true, message: "Plan overview updated successfully", data: res}
    } catch (err) {
        return {success: false, message: "Something went wrong"}
    }
}
export const updatePlanDurationBreakdownAction = async(userId:string, planId:string, data: editPlanDurationBreakdownSchemaType)=>{
      if(!planId){
        return {success: false, message:"Something went wrong."}
    }
  const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
    try {
        const res = await prisma.plan.update({
            where: {
                id: planId
            },
            data:{
                duration1: data.duration1,
                duration1Info: data.duration1Info,
                duration2: data.duration2,
                duration2Info: data.duration2Info,
                duration3: data.duration3,
                duration3Info: data.duration3Info,
                isActive:false,
            }
        })
        return {success: true, message: "Plan duration breakdown updated successfully", data: res}
    } catch (err) {
        return {success: false, message: "Something went wrong"}
    }
}
export const deactivatePlanAction = async(userId:string,planId:string) =>{
    if(!planId){
        return{success: false, message: "Invalid Request"}
    }
    const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
    try {
    const res=await prisma.plan.update({
            where : {
                id: planId
            },
            data: {
                isActive : false
            }
        })
        await prisma.$executeRaw`DELETE FROM plan_vector WHERE "planId" = ${planId} `
        return {success: true, message: "Plan deactivated Temporarily", data:res}
    } catch (err) {
        
    }
}

export const createPlanVectorAction = async(userId:string, planId:string)=>{
if(!planId){
        return{success: false, message: "Invalid Request"}
    }
    const  idRes = await prisma.organization.findFirst({
        where:{
            ownerId: userId,
        }
    })
    if(!idRes?.id){
        return { success: false, message: "Session error. PLease logout and login again"}
    } 
    if(idRes.ownerId !== userId){
        return {success: false, message: "You are not authorized to update this plan"}
    } 
    try {
const planRes = await prisma.plan.update({
                where: {
                    id: planId
                },
                data: {
                    isActive: true,
                    updatedAt: new Date()
                }
            })
            await prisma.$executeRaw`DELETE FROM plan_vector WHERE "planId" = ${planId}`
        if(planRes){
            
        const vectorResults = []
    const chunks = await createPlanChunks(planRes, planRes.isActive, planRes.id)
    for (let i=0; i < chunks.length; i++){
const embedding = await generatePlanEmbedding(chunks[i])
    const vectorString = `[${embedding.join(",")}]`;
    const vectorId = randomUUID();
  const vectorRes =  await prisma.$executeRaw`INSERT INTO plan_vector ("id","planId","content", "embedding", "chunkIndex") VALUES (${vectorId}, ${planRes.id}, ${chunks[i]}, ${vectorString}, ${i+1})`
   vectorResults.push(vectorRes) }
   return {
    success: true, message: "Data published successfully", data: planRes
   }
    } }catch (err) {
        return{
            success:false, message: "Invalid Request"
        }
    }
}