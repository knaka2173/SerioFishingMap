// src/app/api/FishAllViews/route.ts

import { NextResponse } from "next/server";
import { fishRepository } from "@/features/common/repositories/fish.repository";

/**
 * GET /api/FishAllViews
 * すべての釣果記録を取得するAPI
 */
export async function GET() {
  try {
    const records = await fishRepository.getAll();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("GET /api/FishAllViews Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}