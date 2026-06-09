"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Fish = {
  id: string;
  fishName: string;
  locationName: string;
};

const isFish = (value: unknown): value is Fish => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const fish = value as Record<string, unknown>;

  return (
    typeof fish.id === "string" &&
    typeof fish.fishName === "string" &&
    typeof fish.locationName === "string"
  );
};

const isFishList = (value: unknown): value is Fish[] => {
  return Array.isArray(value) && value.every(isFish);
};

export default function MapPage() {
  const router = useRouter();
  const [fishList, setFishList] = useState<Fish[]>([]);

  const handleBackHome = () => {
    router.push("/");
  };

  // 魚読み込みAPI（GET）
  const handleLoadFish = async () => {
    try {
      const res = await fetch("/view-lists/fish-list/get-all-fish-list");

      if (!res.ok) {
        throw new Error(`魚一覧の取得に失敗しました: ${String(res.status)}`);
      }

      const data: unknown = await res.json();

      if (!isFishList(data)) {
        throw new Error("魚一覧APIのレスポンス形式が不正です");
      }

      console.log("魚一覧:", data);
      setFishList(data);
    } catch (err) {
      console.error("魚取得エラー", err);
    }
  };

  // 魚登録API（POST）
  const handleAddFish = async () => {
    try {
      const res = await fetch("/api/FishAllViews/add-fishs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fishName: "ブラックバス",
          locationName: "児島湖",
          caughtDate: "2026-03-18",
        }),
      });

      if (!res.ok) {
        throw new Error(`魚登録に失敗しました: ${String(res.status)}`);
      }

      const data: unknown = await res.json();
      console.log("登録結果:", data);
    } catch (err) {
      console.error("登録エラー", err);
    }
  };

  return (
    <div>
      <h1>魚管理ページ</h1>

      <button onClick={handleBackHome}>ホームへ戻る</button>

      <br />
      <br />

      <button onClick={handleAddFish}>魚登録APIを実行する</button>

      <br />
      <br />

      <button onClick={handleLoadFish}>魚読み込みAPIを実行する</button>

      <br />
      <br />

      <h3>魚一覧</h3>

      <ul>
        {fishList.map((fish) => (
          <li key={fish.id}>
            {fish.fishName} - {fish.locationName}
          </li>
        ))}
      </ul>
    </div>
  );
}
