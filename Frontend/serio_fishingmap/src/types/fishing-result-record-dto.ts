// 釣果記録のデータ型を定義
export interface FishingResultRecord {
  id: string;
  fishId: number;
  locationId: number;
  caughtDate: string;
  size?: number; // ? は任意項目
  details?: string;
  createdAt: string;
}

// 新規作成時にAPIが受け取るデータの型
export type CreateFishingResultDTO = Omit<FishingResultRecord, "id" | "createdAt">;