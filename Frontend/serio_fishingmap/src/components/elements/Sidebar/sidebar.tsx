import { Box, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { sidebarItems } from "./sidebar.data";

export const Sidebar = () => {
  return (
    <Box display="flex" minH="100vh">
      <Box as="nav" bg="gray.800" color="white" w="240px" p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          アプリ名
        </Text>
        <VStack align="stretch" spacing={4}>
          {sidebarItems.map((item) => (
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
              <Icon as={item.icon} boxSize={5} />
              <Text>{item.label}</Text>
            </Link>
          ))}
        </VStack>
      </Box>

      <Box flex="1" p={6} bg="gray.50">
        {/* children はページが入る */}
      </Box>
    </Box>
  );
};
