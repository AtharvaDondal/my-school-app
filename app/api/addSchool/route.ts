import { NextRequest, NextResponse } from "next/server";

import { loadEnvConfig } from '@next/env'
import cloudinary from "@/app/lib/cloudinary";
import pool from "@/app/lib/db";
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const file = formData.get("image") as File;

    let imageUrl: string | null = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        {
          folder: "schools",
        }
      );
      imageUrl = uploadRes.secure_url;
    }

    const sql = `INSERT INTO schools (name, address, city, imageUrl)
                 VALUES (?, ?, ?, ?)`;

    await pool.execute(sql, [name, address, city, imageUrl]);

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error saving school:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
