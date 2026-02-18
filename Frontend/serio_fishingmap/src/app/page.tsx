"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClickFishList = () => {
    router.push("view-lists/fish-list");
  };

  const handleClickMainMap = () => {
    router.push("fishing-spot-main-map");
  };

  return (
    <div>
      {/* 画面遷移の方法の標準については別途検討。ここではテストコードとして実装 */}
      <button onClick={handleClickFishList}>魚一覧へ</button>
      <button onClick={handleClickMainMap}>メインマップへ</button>
    </div>
  );
}
