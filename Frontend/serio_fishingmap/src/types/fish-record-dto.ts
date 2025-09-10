// 釣果記録のデータ型を定義
export interface FishRecord {
  id: string;
  fishName: string;
  locationName: string;
  caughtDate: string;
  size?: number; // ? は任意項目
  notes?: string;
  createdAt: string;
}

// 新規作成時にAPIが受け取るデータの型
export type CreateFishRecordDTO = Omit<FishRecord, "id" | "createdAt">;