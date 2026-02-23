"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClickFishList = () => {
    router.push("view-lists/fish-list");
  };
  const handleClickInputForm = () => {
    router.push("input-form");
  };

  return (
    <div>
      {/* 画面遷移の方法の標準については別途検討。ここではテストコードとして実装 */}
      <button onClick={handleClickFishList}>魚一覧へ</button>
      <br></br>
      <button onClick={handleClickInputForm}>入力フォームへ</button>

      <Sidebar></Sidebar>
      {/* TODO:Sidebarコンポーネントの修正
      ・ヘッダーコンポーネントより開閉可能とする。
        ・コンポーネント表示時はメインコンテンツと横並びにできることを確認する
      ・アプリ名は不要
      */}
    </div>
  );
}
