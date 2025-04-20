"use client";
import { useEffect, useState } from "react";

export default function MapPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/testApi")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data;", error));
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Map</h1>
      <p>This is the map page.</p>
      {/* {data ? <p>{data.message}</p> : <p>Loading...</p>} */}
    </div>
  );
}
