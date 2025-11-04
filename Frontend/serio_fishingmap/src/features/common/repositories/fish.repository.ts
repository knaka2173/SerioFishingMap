// repositories/fish-repository.ts
import { randomUUID } from "crypto";
import { BaseRepository } from "./base-repository";

import { ddbDocClient } from "@/lib/dynamodb";
import type { FishRecord, CreateFishRecordDTO } from "@/types/fish-record-dto";

type FishKey = { id: string };
const TABLE_NAME = process.env.DYNAMODB_FISH_TABLE_NAME;

export const fishRepository: BaseRepository<
  FishRecord,
  CreateFishRecordDTO,
  FishKey
> = new BaseRepository<FishRecord, CreateFishRecordDTO, FishKey>(
  ddbDocClient,
  TABLE_NAME,
  () => ({ id: randomUUID() }),
  (dto, key) => ({
    ...key,
    ...dto,
    createdAt: new Date().toISOString(),
  })
);
