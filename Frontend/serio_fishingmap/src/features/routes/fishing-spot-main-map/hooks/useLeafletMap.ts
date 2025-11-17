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
  enableMarkerPlacement?: boolean;
};

const useLeafletMap = (
  center: Coordinate,
  { enableMarkerPlacement = false }: UseLeafletMapOptions = {}
) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

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

      if (enableMarkerPlacement) {
        map.on("click", handleClick);
      }

      return () => {
        map.off("click", handleClick);
        map.remove();
      };
    }
  }, [center, enableMarkerPlacement]);

  return mapRef;
};

export { useLeafletMap };
