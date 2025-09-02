import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";
import fs from "fs";

import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import pool from "../lib/db";
export const config = { api: { bodyParser: false } };

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: "Form parse error" });
    try {
      // disable-next-line @typescript-eslint
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { name, address, city, state, contact, email_id } = fields as any;
      let imageUrl = "";

      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const result = await cloudinary.v2.uploader.upload(file.filepath, {
          folder: "schoolImages",
        });
        imageUrl = result.secure_url;
        // remove temp file
        try {
          fs.unlinkSync(file.filepath);
        } catch (e) {
          console.log("Temp file deletion error:", e);
        }
      }

      const sql = `INSERT INTO schools (name, address, city, state, contact, imageUrl, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await pool.execute(sql, [
        name,
        address,
        city,
        state,
        contact,
        imageUrl,
        email_id,
      ]);
      res.status(200).json({ message: "School added", imageUrl });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  });
}
