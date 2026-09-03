import cloudinary from "@/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";
import { uuidv4 } from "zod";

export async function POST(req: NextRequest){
const body = await req.formData();
const file = body.get("file") as File

if(!file){
    return NextResponse.json(
        {message : "No file Uploaded"},
        {status : 404}
    )
}
try {

 const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "fitravity",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(result)
    } catch (err) {
    console.log(err)
}
}