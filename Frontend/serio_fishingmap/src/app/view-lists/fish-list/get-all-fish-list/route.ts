// src/app/api/FishAllViews/route.ts
import { NextResponse } from "next/server";
import { fishRepository } from "@/features/common/repositories/fish.repository";
import type { CreateFishDTO } from "@/types/dto/fish-dto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("DYNAMODB_FISH_TABLE_NAME =", process.env.DYNAMODB_FISH_TABLE_NAME);
    const records = await fishRepository.getAll();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("GET /api/FishAllViews Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
