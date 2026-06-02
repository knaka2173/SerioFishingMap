"use client";
import { Image } from "@chakra-ui/react";
import { Label } from "@/components/elements/Label/Label";
import { Fish } from "@/types/dto/fish-dto";

const mockdata: Fish = {
  fishID: 1,
  fishName: "テストName",
  fishOrder: "テストOrder",
  category: "テストCategory",
};

const imageObjectUrl = "https://picsum.photos/300/200?random=1"; //テストデータ

export default function MapPage() {
  const fishdata: Fish = mockdata;

  return (
    <div>
      <Label text={fishdata.fishName} color="primary" size="title" />
      <Label text={fishdata.category} color="secondary" size="subtitle" />
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
