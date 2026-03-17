"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MapPage() {
  const router = useRouter();
  const [fishList, setFishList] = useState<any[]>([]);

  const handleBackHome = () => {
    router.push("/");
  };

  // 魚読み込みAPI（GET）
  const handleLoadFish = async () => {
    try {
      const res = await fetch("/view-lists/fish-list/get-all-fish-list");
      const data = await res.json();

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

      const data = await res.json();
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

      <button onClick={handleAddFish}>
        魚登録APIを実行する
      </button>

      <br />
      <br />

      <button onClick={handleLoadFish}>
        魚読み込みAPIを実行する
      </button>

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