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

const useLeafletMap = (center: Coordinate) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [center]);

  return mapRef;
};

export { useLeafletMap };
