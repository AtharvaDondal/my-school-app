/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import pool from "../../lib/db";

import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schools = (rows as any[]).map((row) => ({
      ...row,
      imageUrl: row.imageUrl, // use imageUrl directly
    }));
    return NextResponse.json(schools, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
