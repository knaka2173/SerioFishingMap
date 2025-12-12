"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FormPage() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div style={{ padding: "24px 20px", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Input Form (placeholder)
      </h1>
      <p style={{ marginBottom: 12 }}>
        The API is not ready yet, so this mock screen is here to verify navigation from the map.
      </p>

      <div
        style={{
          padding: "12px 14px",
          background: "#f7f8fb",
          border: "1px solid #e1e5f0",
          borderRadius: 8,
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Selected coordinate</div>
        <div>Lat: {lat ?? "not provided"}</div>
        <div>Lng: {lng ?? "not provided"}</div>
      </div>

      <p style={{ marginBottom: 16 }}>
        The real input form will be placed here and will submit to the API once it is available.
      </p>

      <Link
        href="/fishing-spot-main-map"
        style={{ color: "#305fcf", textDecoration: "underline" }}
      >
        Back to map
      </Link>
    </div>
  );
}
