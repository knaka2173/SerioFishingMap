// src/app/api/FishAllViews/route.ts

import { fishRepository } from "@/features/common/repositories/fish.repository";

export async function getAllFishList() {
  const records = await fishRepository.getAll();
  return records;
}
