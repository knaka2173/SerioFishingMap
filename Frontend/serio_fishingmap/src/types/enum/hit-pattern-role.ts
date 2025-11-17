// ヒットパターン（釣れ方の特徴）
export enum HitPattern {
  Unknown = 0, // 不明
  SlowRetrieve = 1, // ゆっくり巻き
  FastRetrieve = 2, // 早巻き
  Twitch = 3, // トゥイッチ
  BottomBump = 4, // 底ズル
  Surface = 5, // 表層
}
