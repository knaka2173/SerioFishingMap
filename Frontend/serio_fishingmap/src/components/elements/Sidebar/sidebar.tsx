"use client";

import { Box, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { sidebarItemsData } from "./sidebar.data"; // 正しい名前でインポートし、型もインポート
import { FiHome, FiUser, FiSettings } from "react-icons/fi"; // ★ アイコンコンポーネントを直接インポート
import { IconType } from "react-icons"; // ★ IconType もインポート

// ★ アイコン名と実際のコンポーネントをマッピングするオブジェクトを作成
const iconComponents: { [key: string]: IconType } = {
  FiHome: FiHome,
  FiUser: FiUser,
  FiSettings: FiSettings,
};

export const Sidebar = () => {
  return (
    <Box display="flex" minH="100vh">
      <Box as="nav" bg="gray.800" color="white" w="240px" p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          アプリ名
        </Text>
        <VStack align="stretch" spacing={4}>
          {/* item の型注釈を SidebarItemData にする (インポートしていれば型推論も効く) */}
          {sidebarItemsData.map((item: SidebarItemData) => {
            // ★ item.iconName を使って、対応するアイコンコンポーネントを取得
            const IconComponent = iconComponents[item.iconName];

            return (
              <Link
                key={item.label}
                href={item.href}
                _hover={{ textDecoration: "none", bg: "gray.700" }}
                px={3}
                py={2}
                borderRadius="md"
                display="flex"
                alignItems="center"
                gap={3}
              >
                {/* ★ 取得した IconComponent を as プロパティに渡す */}
                {IconComponent && <Icon as={IconComponent} boxSize={5} />}
                <Text>{item.label}</Text>
              </Link>
            );
          })}
        </VStack>
      </Box>

      <Box flex="1" p={6} bg="gray.50">
        {/* children はページが入る */}
      </Box>
    </Box>
  );
};