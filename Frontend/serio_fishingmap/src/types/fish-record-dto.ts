// 魚データベースのデータ型を定義
export interface FishRecord {
  id: string;
  name: string;
  details?: string;// 自由入力
  createdAt: string; 
}

// 新規作成時にAPIが受け取るデータの型
export type CreateFishRecordDTO = Omit<FishRecord, "id" | "createdAt">;