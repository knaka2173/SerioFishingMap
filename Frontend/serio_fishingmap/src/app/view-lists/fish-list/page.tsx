"use client";
import { useEffect, useState } from "react";
import { CustomCardGroup } from "@/components/elements/Card/CardGroup";
import { FilterChipGroup } from "@/components/elements/filter-chip/FilterChipGroup";
import { Label } from "@/components/elements/Label/Label";

type FishCard = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type FishCardWithObjectUrl = Omit<FishCard, "imageUrl"> & {
  imageObjectUrl: string;
};

const cardData: FishCard[] = [
  {
    id: 1,
    title: "Card 1",
    description: "説明",
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Card 2",
    description: "説明",
    imageUrl: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "Card 3",
    description: "説明",
    imageUrl: "https://picsum.photos/300/200?random=3",
  },
];

export default function FishListPage() {
  const [cards, setCards] = useState<FishCardWithObjectUrl[]>([]);
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const objectUrls: string[] = [];
    let isMounted = true;

    const loadImages = async (): Promise<void> => {
      try {
        const withBlobs = await Promise.all(
          cardData.map(async (item) => {
            const res = await fetch(item.imageUrl);
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            objectUrls.push(objectUrl);

            return {
              id: item.id,
              title: item.title,
              description: item.description,
              imageObjectUrl: objectUrl,
            };
          })
        );

        if (isMounted) {
          setCards(withBlobs);
          return;
        }

        objectUrls.forEach((objectUrl) => {
          URL.revokeObjectURL(objectUrl);
        });
      } catch (error: unknown) {
        console.error("Error loading card images:", error);
      }
    };

    void loadImages();

    return () => {
      isMounted = false;
      objectUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
    };
  }, []);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetch("/api/testApi");
        const responseData: unknown = await response.json();
        setData(responseData);
      } catch (error: unknown) {
        console.error("Error fetching data;", error);
      }
    }

    void fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Label text="一覧表示" size="title" />
      <FilterChipGroup
        options={["React", "Next.js", "Chakra UI", "TypeScript"]}
        defaultSelected={["React"]}
        onChange={(selected) => {
          console.log("選択されたタグ:", selected);
        }}
      />
      <CustomCardGroup items={cards} />
    </div>
  );
}
