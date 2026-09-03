"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import { Application } from "./clientStore";
import { sendEmail } from "@/lib/resend";
import { success } from "zod";
export const fetchApplicationByID = async(appId: string) =>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(session?.user.role !== "Admin"){
        return {success : false, message: "Access Forbidden"}
    }
    try {
        const res = await prisma.trainerApplication.findUnique({
            where : {
                id: appId
            }
        })
        if(res){
            return {success: true, message: "Application fetched Successfully", data: res}
        }
    } catch (err) {
         return {success : false, message: "Invalid Request"}
    }
};
export const adminName = async(adminId:string)=>{
    try {
        const res = await prisma.user.findFirst({
            where: {
                id: adminId
            },
            select:{
               name: true,
            }
        });
        return {success: true, message: "Admin fetched successfully", data: res}
    } catch (err) {
        return {success: false, message : "Invalid request"}
    }
}
export const dryRunAction = async(panId:string) =>{
    if(!panId){
        return {success: false, message: "Dry run failed"}
    }
    try {
          const panHash = await crypto.createHash('sha256').update(panId).digest('hex');
          const res = await prisma.member.findMany({
            where : {
            panNumber: panHash
            }
          })
          if(res.length > 0){
          const riskRes =  await prisma.trainerApplication.update({
               where:{
                panNumber : panId
               },
               data:{
                panNumber: panHash,
                dryRun: true,
                dryRunMessage:  `${res.length} risk account${res.length >1 ? 's': ''} found`
               }
            });
            return {success: false, message: `${res.length} risk account${res.length >1 ? 's': ''} found`, data: riskRes}
          }
          
        const riskRes = await prisma.trainerApplication.update({
            where:{
                panNumber: panId
            },
            data:{
                panNumber: panHash,
                dryRun: true,
                dryRunMessage:  `No Risk found`
            }
         })
          return {success: true, message: "All risk check passed", data: riskRes}
    } catch (err) {
        console.log(err)
        return {success: false, message: "Invalid request"}
    }
};

export const replaceComment = async(appId : string, data: string)=>{
    
   try {
    const res = await prisma.trainerApplication.update({
        where:{
            id : appId
        },
        data: {
            adminComment: data
        }
    });
await sendEmail({
    to: res.email,
        subject: "Onboarding Decision",
        html :`<body style="margin:0;padding:40px 20px;background:#0b0b0b;font-family:Arial,Helvetica,sans-serif;"> <table role="presentation" width="100%" cellspacing="0" cellpadding="0"> <tr> <td align="center"> <table role="presentation" width="600" cellspacing="0" cellpadding="0" style=" background:#141414; border:1px solid #2a2a2a; overflow:hidden; " > <!-- Header --> <tr> <td align="center" style="padding:50px 40px 30px;"> <h1 style=" margin:0; font-size:40px; font-weight:900; letter-spacing:2px; color:#ffffff; " > FIT<span style="color:#B8FF2C;">RAVITY</span> </h1> <p style=" margin-top:12px; font-size:15px; color:#8f8f8f; " > Train Hard. Stay Consistent. </p> </td> </tr> <!-- Message --> <tr> <td style="padding:20px 45px 45px;"> <div style=" background:#1d1d1d; border:1px solid #2f2f2f; padding:28px; " > <p style=" margin:0; color:#c5c5c5; line-height:30px; font-size:15px; white-space:pre-line; " > ${res.adminComment} </p> </div> </td> </tr> <!-- Footer --> <tr> <td align="center" style=" padding:30px; background:#101010; border-top:1px solid #2a2a2a; " > <p style=" margin:0; font-size:14px; color:#ffffff; font-weight:bold; " > FIT<span style="color:#B8FF2C;">RAVITY</span> </p> <p style=" margin-top:10px; font-size:13px; color:#777777; " > Discipline • Consistency • Results </p> <p style=" margin-top:18px; font-size:12px; color:#555555; " > © 2026 FitRavity. All rights reserved. </p> </td> </tr> </table> </td> </tr> </table> </body>`
})

    return {success: true, data: res}
   } catch (error) {
    console.log(error)
    return {success: false, message: "Something went wrong"}
   }
}

export const approveApplicantAction = async(data: Application | null, note: string | null)=>{
    if(data === null){
        return { success: false, message: "Invalid Request"}
    }
    try {
        if(data.status === "APPROVED" || data.status === "REJECTED"){
            return {success: false, message: "Decision for this application have been taken please refresh the page"}
        }
        if(!data.adminComment){
            return {success: false, message: "Please send the verification Message to Applicant"}
        }
        if(!data.dryRun){
            return {success: false, message: "Please verify PAN details and then DRY RUN to encrypt the PAN CARD"}
        }
        if(!note){
            return {success: false, message : "Please add internal notes for Audit"}
        }
       const panCHeck = await prisma.member.findMany({
        where : {
            panNumber : data.panNumber
        }
       }) 
       if(panCHeck.length > 0){
        return {success: false, message: "User with the same Govt Id, already exists. Please reject the Application"}
       }
        
            if(data.brand === "FITRAVITY"){
                const brandRes = await prisma.organization.create({
                    data: {
                         id : uuidv4(),
                         ownerId: data.userId,
                         name : `${data.fullName.split(' ')[0]} FITRAINER`,
                         slug : `GETFITBY${data.fullName.split(' ')[0]}${uuidv4().slice(-3)}`,
                         createdAt : new Date(),
                    }
                })
             const ravityRes = await prisma.member.create({
                    data:{
                        id: uuidv4(),
                        organizationId: brandRes.id,
                        userId : data.userId,
                        role: "Owner",
                        bio : data.bio,
                        createdAt: new Date(),
                        panNumber: data.panNumber,
                        certifications: data.certifications,
                        city: data.city,
                        country: data.country,
                        dob: data.dob,
                        designation: data.designation,
                        experience: data.experience,
                        profileImage: data.profileImage,
                        social: data.social,
                        specialization: data.specialization,
                        
                    }
                })
                 await prisma.user.update({
                    where : {
                        id: data.userId
                    },
                    data: {
                        role: "Fitrainer",
                    }
                })
                
                return {success: true, message: "New Partner Created Successfully,"}
            }
            if(data.brand === "OWN BRAND"){
                const checkRes = await prisma.organization.findMany({
            where : {
                name : data.fullName,
            }
        })
        if(checkRes.length >0){
            return {success: false, message: "Cannot Chose this name as the name already exists. PLease reject the application."}
        }
                const brandRes = await prisma.organization.create({
                    data: {
                         id : uuidv4(),
                         ownerId: data.userId,
                         name : data.designation,
                         slug : `GETFITBY${data.fullName.toUpperCase().split(' ')[0]}${uuidv4().slice(-3)}`,
                         createdAt : new Date(),
                    }
                })
                const ravityRes = await prisma.member.create({
                    data:{
                        id: uuidv4(),
                        organizationId: brandRes.id,
                        userId : data.userId,
                        role: "Owner",
                        bio : data.bio,
                        createdAt: new Date(),
                        panNumber: data.panNumber,
                        certifications: data.certifications,
                        city: data.city,
                        country: data.country,
                        dob: data.dob,
                        designation: "Brand Rep.",
                        experience: data.experience,
                        profileImage: data.profileImage,
                        social: data.social,
                        specialization: data.specialization,
                        
                    }
                })
                await prisma.user.update({
                    where : {
                        id: data.userId
                    },
                    data: {
                        role: "Owner",
                    }
                })
                
            }
            await prisma.trainerApplication.update({
                    where: {
                        id : data.id,
                    },
                    data:{
                        notes: note,
                        status: "APPROVED",
                    }
                })
                
                return {success: true, message:"New Partner created SuccessFully"}
    } catch (err) {
        console.log(err)
        return { success: false, message: "Invalid Request"}
    }
}

export const rejectApplicationAction = async(data: Application | null, note: string)=>{
     if(data === null){
        return { success: false, message: "Invalid Request"}
    }
    try {
        if(!data.adminComment){
            return {success: false, message: "Please send the verification Message to Applicant"}
        }
        if(!data.dryRun){
            return {success: false, message: "Please verify PAN details and then DRY RUN to encrypt the PAN CARD"}
        }
        if(!note){
            return {success: false, message : "Please add internal notes for Audit"}
        }
        await prisma.trainerApplication.update({
                    where: {
                        id : data.id,
                    },
                    data:{
                        notes: note,
                        status: "REJECTED",
                    }
                })
                return {success: true, message:"Form Rejected"}
    }catch{
    return { success: false, message: "Invalid Request"}
    }
}