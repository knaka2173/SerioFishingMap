import { Sidebar } from "@/components/elements/sidebar/sidebar";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Sidebar>
      <Heading>ホーム</Heading>
      <Text>これはChakra UI v3で動作するサイドバー付きレイアウトです。</Text>
    </Sidebar>
  );
}
