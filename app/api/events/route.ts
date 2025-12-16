import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req:NextRequest){
  try{
    await connectToDatabase();
    const formData = await req.formData();

    let event;
    try {
      event=Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({message: 'Invalid JSON data format'}, {status:400})
    }
    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }

       const tags =
      typeof event.tags === "string"
        ? event.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

    const agenda =
      typeof event.agenda === "string"
        ? event.agenda.split(",").map((a) => a.trim()).filter(Boolean)
        : [];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject)=>{
      cloudinary.uploader.upload_stream({
        resource_type:'image',
        folder: 'dev-events',
      }, (error, results)=>{
          if(error){
            return reject(error);
          }
          resolve(results);
      }).end(buffer);
    })

    event.image=(uploadResult as {secure_url:string}).secure_url;

    const createdAt= await Event.create({...event, tags:tags, agenda:agenda});
    
    return NextResponse.json({message: 'Event Created Successfully', event: createdAt}, {status:201})
  }catch(e){
    console.error(e);
    return NextResponse.json({message: 'Event Creation Failed', error:e instanceof Error? e.message:'Unkown'})
  }
}

export async function GET(){
  try {
    await connectToDatabase();

    const events=await Event.find().sort({createdAt:-1});

    return NextResponse.json({message:'Event list fetched successfully', events}, {status:200})
  } catch (e) {
    return NextResponse.json({message: 'Event fetching failed', error:e}, {status:500})
  }
}


