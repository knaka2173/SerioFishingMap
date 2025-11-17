import { NextResponse } from "next/server";
import { getAllFishList } from "@/features/fish-list/get-all-fish-list/route";
/**
 * GET /api/FishAllViews
 * すべての釣果記録を取得するAPI
 */
export async function GET() {
  try {
    const records = await getAllFishList();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("GET /api/FishAllViews Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
