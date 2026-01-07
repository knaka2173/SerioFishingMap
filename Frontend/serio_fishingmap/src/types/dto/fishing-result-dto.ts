// 釣果のデータ型を定義
export type FishingResult = {
  FishingResultID: number; // 釣果ID 主キー
  createdAt: string; // 作成日時

  FishingTripID: number; // 釣行ID
  SequenceNo: number; // 連番
  FishID: number; // 魚ID
  MemberID: number; // メンバーID
  FishingTypeID: number; // 釣り種別ID
  ToolID: number; // 道具ID
  TackleID: number; // 仕掛けID
  BaitID: number; // 餌ID
  WaterQualityID: number; // 水質ID
  CatchDateTime: string; // 釣れた時間
  TideCondition: number; // 潮の状態 列挙型で定義
  Weather: number; // 天気 列挙型で定義
  WaterTemperature: number; // 水温 列挙型で定義
  WindSpeed: number; // 風速 列挙型で定義
  WindDirection: number; // 風向き 列挙型で定義
  WaveHeight: number; // 波の高さ 列挙型で定義
  Depth: number; // 深さ 列挙型で定義
  HitPattern: number; // ヒットパターン 列挙型で定義
  Note: string; // 備考
  Size: number; // サイズ 列挙型で定義
  IsReleased: boolean; // リリースの有無
};

// 新規作成時にAPIが受け取るデータの型
export type CreateFishingResultDTO = Omit<
  FishingResult,
  "FishingResultID" | "createdAt"
>;
