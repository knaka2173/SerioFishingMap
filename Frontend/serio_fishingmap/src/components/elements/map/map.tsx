"use client";

import { useLeafletMap } from "@/features/routes/fishing-spot-main-map/hooks/useLeafletMap";
//import "leaflet/dist/leaflet.css";

import "./map.module.css";

export const Map = () => {
  const mapRef = useLeafletMap([33.5902, 130.4207]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", minHeight: "calc(100vh - 160px)" }} // 必要な高さを確保
    />
  );
};
