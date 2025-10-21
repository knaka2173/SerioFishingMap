"use client";
import { useRouter } from "next/navigation";
import CalendarButton from "@/components/elements/calendar/calendar";
import DatePickerButton from "@/components/elements/calendar/datepicker";
import { Sidebar } from "@/components/elements/Sidebar/sidebar";

export default function Home() {
  const router = useRouter();

  const handleClickFishList = () => {
    router.push("view-lists/fish-list");
  };

  return (
    <span>
      {/* 画面遷移の方法の標準については別途検討。ここではテストコードとして実装 */}
      <button onClick={handleClickFishList}>魚一覧へ</button>

      <DatePickerButton></DatePickerButton>
      <CalendarButton></CalendarButton>

      <Sidebar></Sidebar>
      {/* TODO:Sidebarコンポーネントの修正
      ・ヘッダーコンポーネントより開閉可能とする。
        ・コンポーネント表示時はメインコンテンツと横並びにできることを確認する
      ・アプリ名は不要
      */}
    </span>
  );
}
