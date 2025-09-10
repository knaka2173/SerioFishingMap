// src/app/api/FishAllViews/route.ts

import { NextResponse } from "next/server";
import { createFishRecord, CreateFishRecordDTO } from "@/services/fishService";

/**
 * POST /api/FishAllViews
 * 新しい釣果記録を追加するAPI
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateFishRecordDTO;

    // 簡単なバリデーション
    if (!body.fishName || !body.locationName || !body.caughtDate) {
      return NextResponse.json(
        { error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    const newRecord = await createFishRecord(body);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("POST /api/FishAllViews Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
