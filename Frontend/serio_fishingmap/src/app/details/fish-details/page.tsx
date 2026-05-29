"use client";
import Image from "@chakra-ui/react";
import { Fish } from "@/types/dto/fish-dto";

const mockdata: Fish = {
  fishID: 1,
  fishName: "カワハギ",
  fishOrder: "test",
  category: "ハギ",
};

const imageObjectUrl = "https://picsum.photos/300/200?random=1"; //テストデータ

export default function MapPage() {
  const fishdata: Fish = mockdata;

  return (
    <div>
      <Image
        src={imageObjectUrl}
        alt={fishdata.fishName}
        borderTopRadius="md"
        objectFit="cover"
        h="150px"
        w="100%"
      />
    </div>
  );
}
