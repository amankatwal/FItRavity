"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

export const fetchAllApplications=async(userId: string, email?:string)=>{
 try {
    if(email){
        const res= await prisma.trainerApplication.findMany({
            where: {
                email: email
            }
        })
        if(res){
        return {success: true, message: "", data : res}
        
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
try {
    const session = await auth.api.getSession({
        headers : await headers()
    })
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
const fetchApplicationByEmail = async() =>{

}