"use client";

import { useAtom } from "jotai";
import type { ChangeEvent } from "react";
import { InputFormSubmitButton } from "@/components/elements/button/input-form-submit-button/button";
import {
  inputFormValuesAtom,
  updateInputFormAtom,
  inputFormErrorsAtom,
  inputFormCanSubmitAtom,
  inputFormSubmissionPayloadAtom,
  resetInputFormAtom,
  inputFormStatusAtom,
  inputFormServerMessageAtom,
  markInputFormSubmittingAtom,
  markInputFormResultAtom,
} from "@/features/routes/input-form/stores/atom";

type NumericField = "fishingTripId" | "sequenceNo" | "fishId" | "memberId";

export default function FormPage() {
  // jotaiのグローバルステートから必要な値／更新関数を取得
  const [formValues] = useAtom(inputFormValuesAtom);
  const [, updateInputForm] = useAtom(updateInputFormAtom);
  const [errors] = useAtom(inputFormErrorsAtom);
  const [canSubmit] = useAtom(inputFormCanSubmitAtom);
  const [submissionPayload] = useAtom(inputFormSubmissionPayloadAtom);
  const [status] = useAtom(inputFormStatusAtom);
  const [serverMessage] = useAtom(inputFormServerMessageAtom);
  const [, resetForm] = useAtom(resetInputFormAtom);
  const [, markSubmitting] = useAtom(markInputFormSubmittingAtom);
  const [, markResult] = useAtom(markInputFormResultAtom);

  // 数値フィールド向けの入力ハンドラ
  const handleNumberChange =
    (key: NumericField) => (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.value === "" ? null : Number(event.target.value);
      updateInputForm({ key, value });
    };

  // 文字列／日時フィールド向けの入力ハンドラ
  const handleStringChange =
    (key: "catchDateTime" | "note") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateInputForm({ key, value: event.target.value });
    };

  const handleToggleReleased = () => {
    updateInputForm({ key: "isReleased", value: !formValues.isReleased });
  };

  const handleSubmit = () => {
    if (!canSubmit || !submissionPayload) {
      markResult({
        status: "error",
        message: "入力内容を確認してください",
      });
      return;
    }

    // 実際のAPI呼び出しの代わりに擬似的な送信処理を行う
    markSubmitting();
    setTimeout(() => {
      console.info("送信ペイロード", submissionPayload);
      markResult({
        status: "success",
        message: "ダミーリクエストを送信しました",
      });
    }, 400);
  };

  const handleReset = () => {
    resetForm(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h1>釣果入力フォーム（Jotai使用例）</h1>

      <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        魚種ID
        <input
          type="number"
          value={formValues.fishId ?? ""}
          onChange={handleNumberChange("fishId")}
        />
        {errors.fishId && <span style={{ color: "red" }}>{errors.fishId}</span>}
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        釣果日時
        <input
          type="datetime-local"
          value={formValues.catchDateTime}
          onChange={handleStringChange("catchDateTime")}
        />
        {errors.catchDateTime && (
          <span style={{ color: "red" }}>{errors.catchDateTime}</span>
        )}
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        備考（{formValues.note.length}/{500}）
        <textarea
          rows={4}
          value={formValues.note}
          onChange={handleStringChange("note")}
        />
        {errors.note && <span style={{ color: "red" }}>{errors.note}</span>}
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={formValues.isReleased}
          onChange={handleToggleReleased}
        />
        リリース済み
      </label>

      <InputFormSubmitButton
        onClick={handleSubmit}
        disabled={!canSubmit || status === "submitting"}
      />

      <button type="button" onClick={handleReset}>
        入力内容をリセット
      </button>

      <div>
        <p>ステータス: {status}</p>
        {serverMessage && <p>サーバーメッセージ: {serverMessage}</p>}
      </div>

      <pre style={{ background: "#f4f4f4", padding: "8px" }}>
        {JSON.stringify(formValues, null, 2)}
      </pre>
    </div>
  );
}
