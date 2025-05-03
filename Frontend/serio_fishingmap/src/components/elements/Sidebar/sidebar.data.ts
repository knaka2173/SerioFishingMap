import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { IconType } from "react-icons";

export type SidebarItem = {
  label: string;
  icon: IconType;
  href: string;
};

export const sidebarItems: SidebarItem[] = [
  { label: "ホーム", icon: FiHome, href: "/home" },
  { label: "ユーザー", icon: FiUser, href: "/users" },
  { label: "設定", icon: FiSettings, href: "/settings" },
];
