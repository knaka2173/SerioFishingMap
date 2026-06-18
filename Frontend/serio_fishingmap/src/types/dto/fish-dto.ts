// 魚のデータ型を定義
export type Fish = {
  fishID: number;
  fishName: string;
  fishOrder: string; // 自由入力
  category: string;
};

// 新規作成時にAPIが受け取るデータの型
export type CreateFishDTO = Omit<Fish, "id" | "createdAt">;
