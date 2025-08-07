"use client";
import { CustomCardGroup } from "@/components/elements/Card/CardGroup";
import { Label } from "@/components/elements/Label/Label";
import { FilterChipGroup } from "@/components/elements/filter-chip/FilterChipGroup";
import { useEffect, useState } from "react";

// TODO:テストデータ
const cardData = [
  {
    id: 1,
    title: "Card 1",
    description: "説明1",
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Card 2",
    description: "説明2",
    imageUrl: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "Card 3",
    description: "説明3",
    imageUrl: "https://picsum.photos/300/200?random=3",
  },
];

export default function FishListPage() {
  // カードグループコンポーネント
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const withBlobs = await Promise.all(
        cardData.map(async (item) => {
          const res = await fetch(item.imageUrl);
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          return { ...item, imageObjectUrl: objectUrl };
        })
      );
      setCards(withBlobs);
    };

    loadImages();

    return () => {
      cards.forEach((card) => {
        if (card.imageObjectUrl) URL.revokeObjectURL(card.imageObjectUrl);
      });
    };
  }, []);

  // GET API
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
      <Label text="魚一覧" size="title" />
      <FilterChipGroup
        options={["React", "Next.js", "Chakra UI", "TypeScript"]}
        defaultSelected={["React"]}
        onChange={(selected) => console.log("選択されたタグ:", selected)}
      />
      <CustomCardGroup items={cards} />
    </div>
  );
}
