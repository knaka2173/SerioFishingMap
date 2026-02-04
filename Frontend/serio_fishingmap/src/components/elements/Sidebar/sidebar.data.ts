// sidebar.data.ts
// IconType や FiHome などの直接インポートは不要になります

export type SidebarItemData = {
  label: string;
  iconName: "FiHome" | "FiUser" | "FiSettings";
  href: string;
};

export const sidebarItemsData: SidebarItemData[] = [
  { label: "ホーム", iconName: "FiHome", href: "/home" },
  { label: "ユーザー", iconName: "FiUser", href: "/users" },
  { label: "設定", iconName: "FiSettings", href: "/settings" },
];
