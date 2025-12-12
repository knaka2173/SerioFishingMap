"use client";

import type { LatLng } from "leaflet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLeafletMap } from "@/features/routes/fishing-spot-main-map/hooks/useLeafletMap";

import "./map.module.css";

// 実APIが未整備のため、型とモックデータ・モックAPIをこのコンポーネント内に定義
type FishingSpotSummary = {
  id: number;
  name: string;
  coordinate: [number, number];
  shortDescription: string;
};

type FishingSpotDetail = FishingSpotSummary & {
  description: string;
  targetFish: string[];
  bestSeason: string;
  waterDepth: string;
  note: string;
};

// 地図上に表示する仮のスポット一覧
const MOCK_SPOTS: FishingSpotDetail[] = [
  {
    id: 1,
    name: "Kojima Bay Shore",
    coordinate: [34.655, 133.919],
    shortDescription: "Shallow rocks & weed area",
    description:
      "Sheltered shallow bay. Light game with plugs and soft baits works well around weed edges.",
    targetFish: ["Seabass", "Flounder", "Rockfish"],
    bestSeason: "Spring - Autumn",
    waterDepth: "0.5m - 2m",
    note: "Fish the incoming tide; wading recommended only at calm conditions.",
  },
  {
    id: 2,
    name: "Ushimado Pier",
    coordinate: [34.6415, 134.0675],
    shortDescription: "Harbor pier with steady current",
    description:
      "Outer pier that catches tidal flow. Metal jigs and jig heads reach the bottom quickly.",
    targetFish: ["Mackerel", "Horse mackerel", "Seabass"],
    bestSeason: "Year-round, peak in early summer",
    waterDepth: "3m - 8m",
    note: "Wear a life jacket. Night fishing is effective with small lures.",
  },
  {
    id: 3,
    name: "Yoshii River Mouth",
    coordinate: [34.5805, 133.9455],
    shortDescription: "River mouth sand flat",
    description:
      "Wide sand flat where bait gathers on the tide change. Long casts help cover the channel.",
    targetFish: ["Flounder", "Seabass"],
    bestSeason: "Autumn - Winter",
    waterDepth: "1m - 4m",
    note: "Check wading routes at low tide; watch for boat traffic.",
  },
];

// 一覧取得のモックAPI
const fetchFishingSpotsMock = async (): Promise<FishingSpotSummary[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          MOCK_SPOTS.map(({ id, name, coordinate, shortDescription }) => ({
            id,
            name,
            coordinate,
            shortDescription,
          }))
        ),
      300
    )
  );

// 詳細取得のモックAPI
const fetchFishingSpotDetailMock = async (
  id: number
): Promise<FishingSpotDetail | null> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const spot = MOCK_SPOTS.find((item) => item.id === id);
      resolve(spot ?? null);
    }, 400)
  );

export const Map = () => {
  const router = useRouter();
  // マップ上に配置するスポット一覧
  const [spots, setSpots] = useState<FishingSpotSummary[]>([]);
  // クリックして取得したスポットの詳細
  const [selectedSpot, setSelectedSpot] = useState<FishingSpotDetail | null>(null);
  // 詳細取得中のスポットID（ローディング表示制御用）
  const [loadingSpotId, setLoadingSpotId] = useState<number | null>(null);
  // エラーメッセージ表示用
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // マウント時にモックAPIからスポット一覧を読み込む
    fetchFishingSpotsMock()
      .then(setSpots)
      .catch(() => setErrorMessage("Failed to load mock data."));
  }, []);

  const handleSpotClick = async (spotId: number) => {
    // ピン選択時に詳細をモックAPIから取得
    setErrorMessage(null);
    setLoadingSpotId(spotId);
    try {
      const detail = await fetchFishingSpotDetailMock(spotId);
      if (!detail) {
        setSelectedSpot(null);
        setErrorMessage("No spot detail found.");
        return;
      }
      setSelectedSpot(detail);
    } catch (error) {
      setErrorMessage("Failed to load spot detail.");
      setSelectedSpot(null);
    } finally {
      setLoadingSpotId(null);
    }
  };

  const handleMapClick = (latlng: LatLng) => {
    // 地図クリックで入力フォームへ遷移するか確認
    const shouldNavigate = window.confirm(
      "Go to the input form to register a new spot?"
    );

    if (shouldNavigate) {
      router.push(
        `/input-form?lat=${latlng.lat.toFixed(5)}&lng=${latlng.lng.toFixed(5)}`
      );
    }
  };

  // Leafletマップの初期化とイベントコールバック設定
  const mapRef = useLeafletMap([34.655, 133.919], {
    enableMarkerPlacement: false,
    spots,
    onSpotClick: handleSpotClick,
    onMapClick: handleMapClick,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapRef}
        style={{ width: "100%", minHeight: "calc(100vh - 160px)" }} // keep map full height
      />

      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          padding: "10px 12px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          borderRadius: 8,
          maxWidth: 320,
          fontSize: 14,
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Fishing Map</div>
        <div>Tap a pin to fetch mock data and show detail.</div>
        <div>Tap the map to confirm navigation to the input form.</div>
        {errorMessage && (
          <div style={{ color: "#b00020", marginTop: 8 }}>{errorMessage}</div>
        )}
      </div>

      {selectedSpot && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            padding: "14px 16px",
            background: "rgba(255, 255, 255, 0.96)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
            borderRadius: 10,
            maxWidth: 360,
            minWidth: 280,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
            {selectedSpot.name}
          </div>
          <div style={{ color: "#333", marginBottom: 8 }}>
            {selectedSpot.shortDescription}
          </div>
          <div style={{ marginBottom: 6 }}>{selectedSpot.description}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <Badge label={`Target: ${selectedSpot.targetFish.join(", ")}`} />
            <Badge label={`Season: ${selectedSpot.bestSeason}`} />
            <Badge label={`Depth: ${selectedSpot.waterDepth}`} />
          </div>
          <div style={{ color: "#555" }}>{selectedSpot.note}</div>
        </div>
      )}

      {loadingSpotId && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            padding: "10px 12px",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Loading pin info...
        </div>
      )}
    </div>
  );
};

// バッジ表示用の小さなコンポーネント
const Badge = ({ label }: { label: string }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 8px",
      background: "#eff4ff",
      color: "#305fcf",
      borderRadius: 999,
      fontSize: 12,
      border: "1px solid #dce5ff",
    }}
  >
    {label}
  </span>
);
