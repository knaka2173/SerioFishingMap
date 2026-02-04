"use client";
import { useEffect, useState } from "react";

export default function MapPage() {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/testApi")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error: unknown) => {
          console.error("Error fetching data;", error);
        });
    }

    void fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1></h1>
      <p></p>
    </div>
  );
}
