"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { standardProtection } from "@/lib/security"
import { headers } from "next/headers"

export const fetchAllApplications=async(userId: string, email?:string)=>{
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
    if(email){
        const res= await prisma.trainerApplication.findMany({
            where: {
                email: email
            }
        })
        if(res){
        return {success: true, data : res}
        
    }else{
        return {success: false, message: "No Application Found"}
    }
    }
    const res = await prisma.trainerApplication.findMany({
        where:{
            status: "PENDING",
            brand:{
                in: ["OWN BRAND", "FITRAVITY"]
            },
            OR : [
{adminId: null },
{adminId : userId}
            ]
            
        }
    })
    if(res){
        return {success: true, message: "", data : res}
        
    }else{
        return {success: false, message: "No latest Application"}
    }
 } catch (err) {
   console.log(err)
 }
}

export const selfAssign =async(appId:string)=>{
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
    const userId = session?.user.id
    const res = await prisma.trainerApplication.update({
       where :{
        id: appId
       },
       data:{
       adminId: userId
       }
    })
    return {success : true, message: `Application id ${res.id} accepted`, data: res}
} catch (err) {
    return {success: false, message: `Invalid Request`}
}
}