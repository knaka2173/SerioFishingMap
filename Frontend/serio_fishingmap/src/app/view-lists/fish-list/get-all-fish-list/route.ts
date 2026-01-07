import { NextResponse } from "next/server";
import { getAllFishList } from "@/features/routes/view-lists/fish-list/api/route";

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
