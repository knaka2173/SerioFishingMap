// src/app/api/FishAllViews/route.ts
import { NextResponse } from "next/server";
import { fishRepository } from "@/features/common/repositories/fish.repository";
import type { CreateFishDTO } from "@/types/dto/fish-dto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateFishDTO;

    if (!body.fishName || !body.fishOrder || !body.category) {
      return NextResponse.json(
        { error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    const newRecord = await fishRepository.create(body);
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("POST /api/FishAllViews Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
