// 場所データベースのデータ型を定義
export interface LocationRecord {
  id: string;
  name: string;
  details?: string;// 自由入力
  createdAt: string; 
}

// 新規作成時にAPIが受け取るデータの型
export type CreateLocationRecordDTO = Omit<LocationRecord, "id" | "createdAt">;