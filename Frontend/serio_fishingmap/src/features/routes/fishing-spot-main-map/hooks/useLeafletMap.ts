"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
// Leaflet CSS is globally imported via src/app/globals.css
// import "leaflet/dist/leaflet.css";
//  import { Coordinate } from "@/utils/type";
/** 緯度・経度を表す型 */
export type Coordinate = [number, number];
// またはオブジェクト型でも可：
// export interface Coordinate { lat: number; lng: number; }

type UseLeafletMapOptions = {
  /** マップ上でクリックしたときにマーカーを置けるか */
  enableMarkerPlacement?: boolean;
};

/**
 * 指定座標を中心としたLeafletマップをセットアップし、コンテナのrefとマップインスタンスを返す。
 * enableMarkerPlacementがtrueの場合はクリック位置に座標付きのマーカーを表示する。
 */
const useLeafletMap = (
  center: Coordinate,
  { enableMarkerPlacement = false }: UseLeafletMapOptions = {}
) => {
  /** マップを描画するDOM要素の参照 */
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR環境やref未確定の場合は何もしない
    if (typeof window !== "undefined" && mapRef.current) {
      // 指定中心座標・ズームでマップインスタンスを作成
      const map = L.map(mapRef.current).setView(center, 13);

      // OSMタイルを読み込み
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // クリック位置にマーカーを配置
      const handleClick = (event: L.LeafletMouseEvent) => {
        const marker = L.marker(event.latlng).addTo(map);

        marker
          .bindPopup(
            `Lat: ${event.latlng.lat.toFixed(5)}, Lng: ${event.latlng.lng.toFixed(
              5
            )}`
          )
          .openPopup();
      };

      // オプションがtrueの場合のみクリックイベントを登録
      if (enableMarkerPlacement) {
        map.on("click", handleClick);
      }

      // アンマウント時にイベント解除とインスタンス破棄
      return () => {
        map.off("click", handleClick);
        map.remove();
      };
    }
  }, [center, enableMarkerPlacement]);

  return mapRef;
};

export { useLeafletMap };
