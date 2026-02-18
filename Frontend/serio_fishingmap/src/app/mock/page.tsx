"use client";
import { useRouter } from "next/navigation";

export default function MapPage() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div>
      <h1></h1>
      <p></p>
      <button onClick={handleBackHome}>ホームへ戻る</button>
      <br />
      <br />
      <button /*onClick={}*/>釣果登録APIを実行する</button>
      <br />
      <br />
      <button /*onClick={}*/>釣果読み込みAPIを実行する</button>
    </div>
  );
}
