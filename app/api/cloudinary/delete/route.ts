import cloudinary from "@/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req:NextRequest){
    const {publicId} = await req.json() 
    if(!publicId){
        return NextResponse.json(
            {message: "Invalid Requiest"},
            {status : 401}
        )
    }
    try {
        const res = await cloudinary.uploader.destroy(publicId)
    return NextResponse.json(res)
    } catch (err) {
        console.log(err)
    }
    
}