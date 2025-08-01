/**
 * usage
 */
// useEffect(() => {
//   const fetchImageBlob = async () => {
//     const res = await fetch("/api/image?id=123"); // バイナリ画像を返すエンドポイント
//     const blob = await res.blob();
//     const objectUrl = URL.createObjectURL(blob); // ブラウザ上で Blob や File を一時的なURLに変換する
//     setImageObjectUrl(objectUrl);
//   };

//   fetchImageBlob();

//   // クリーンアップ：URL解放
//   return () => {
//     if (imageObjectUrl) {
//       URL.revokeObjectURL(imageObjectUrl); //ブラウザリソース節約のため、開放
//     }
//   };
// }, []);

// if (!imageObjectUrl) return <p>Loading...</p>;

// return (
//   <CustomCard
//     title="DB画像のカード"
//     description="画像はBlobから作成されています"
//     imageObjectUrl={imageObjectUrl}
//   />
// );

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";

type CustomCardProps = {
  title: string;
  description: string;
  imageObjectUrl: string; // Blob URL を渡す
  footer?: React.ReactNode;
};

export const CustomCard = ({
  title,
  description,
  imageObjectUrl,
  footer,
}: CustomCardProps) => {
  return (
    <Card
      maxW="sm"
      boxShadow="md"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <CardHeader>
        <Image src={imageObjectUrl} alt={title} borderRadius="md" />
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{title}</Heading>
          <Text color="gray.600">{description}</Text>
        </Stack>
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
