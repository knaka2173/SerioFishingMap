/** usage */
// const cardData = [
//   {
//     id: 1,
//     title: "Card 1",
//     description: "説明1",
//     imageUrl: "https://picsum.photos/300/200?random=1",
//   },
//   {
//     id: 2,
//     title: "Card 2",
//     description: "説明2",
//     imageUrl: "https://picsum.photos/300/200?random=2",
//   },
//   {
//     id: 3,
//     title: "Card 3",
//     description: "説明3",
//     imageUrl: "https://picsum.photos/300/200?random=3",
//   },
// ];

// export default function Home() {
//   const [cards, setCards] = useState<any[]>([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       const withBlobs = await Promise.all(
//         cardData.map(async (item) => {
//           const res = await fetch(item.imageUrl);
//           const blob = await res.blob();
//           const objectUrl = URL.createObjectURL(blob);
//           return { ...item, imageObjectUrl: objectUrl };
//         })
//       );
//       setCards(withBlobs);
//     };

//     loadImages();

//     return () => {
//       cards.forEach((card) => {
//         if (card.imageObjectUrl) URL.revokeObjectURL(card.imageObjectUrl);
//       });
//     };
//   }, []);

//   return <CustomCardGroup items={cards} />;
// }
import { SimpleGrid } from "@chakra-ui/react";
import { CustomCard } from "./Card";

type CardItem = {
  id: string | number;
  title: string;
  description: string;
  imageObjectUrl: string;
  footer?: React.ReactNode;
};

type CustomCardGroupProps = {
  items: CardItem[];
  columns?: number[]; // オプション：レスポンシブ対応
};

export const CustomCardGroup = ({
  items,
  columns = [1, 2, 3], // スマホ1列、タブレット2列、PC3列
}: CustomCardGroupProps) => {
  return (
    <SimpleGrid columns={columns} spacing={6}>
      {items.map(({ id, title, description, imageObjectUrl, footer }) => (
        <CustomCard
          key={id}
          title={title}
          description={description}
          imageObjectUrl={imageObjectUrl}
          footer={footer}
        />
      ))}
    </SimpleGrid>
  );
};
