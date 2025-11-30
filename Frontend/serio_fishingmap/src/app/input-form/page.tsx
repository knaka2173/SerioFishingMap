"use client";

import { useAtom } from "jotai";
import { useState, type ChangeEvent } from "react";
import { AddMemberButton } from "@/components/elements/button/add-member-button/add-member-button";
import { InputFormSubmitButton } from "@/components/elements/button/input-form-submit-button/input-form-submit-button";
import CalendarButton from "@/components/elements/calendar/calendar";
import SelectBox, {
  type SelectOption,
} from "@/components/elements/dropdown/dropdown";
import { Label } from "@/components/elements/Label/Label";
import { TextField } from "@/components/elements/text-field/text-field";
import TextAreaInput from "@/components/elements/textarea/textarea";
import { InputFormResetButton } from "@/features/routes/input-form/components/input-form-reset-button";
import {
  inputFormValuesAtom,
  updateInputFormAtom,
  inputFormErrorsAtom,
  inputFormCanSubmitAtom,
  inputFormSubmissionPayloadAtom,
  inputFormStatusAtom,
  inputFormServerMessageAtom,
  markInputFormSubmittingAtom,
  markInputFormResultAtom,
} from "@/features/routes/input-form/stores/atom";

type NumericField =
  | "fishingTripId"
  | "sequenceNo"
  | "fishId"
  | "memberId"
  | "fishingTypeId"
  | "toolId"
  | "tackleId"
  | "baitId"
  | "waterQualityId"
  | "tideCondition"
  | "weather"
  | "waterTemperature"
  | "windSpeed"
  | "windDirection"
  | "waveHeight"
  | "depth"
  | "hitPattern"
  | "size";

const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
  maxWidth: "960px",
};

const sectionStyle = { display: "grid", gap: "8px" };

export default function FormPage() {
  const [formValues] = useAtom(inputFormValuesAtom);
  const [, updateInputForm] = useAtom(updateInputFormAtom);
  const [errors] = useAtom(inputFormErrorsAtom);
  const [canSubmit] = useAtom(inputFormCanSubmitAtom);
  const [submissionPayload] = useAtom(inputFormSubmissionPayloadAtom);
  const [status] = useAtom(inputFormStatusAtom);
  const [serverMessage] = useAtom(inputFormServerMessageAtom);
  const [, markSubmitting] = useAtom(markInputFormSubmittingAtom);
  const [, markResult] = useAtom(markInputFormResultAtom);

  const [extraValues, setExtraValues] = useState({
    startTime: "",
    endTime: "",
    locationName: "",
    longitude: "",
    latitude: "",
    fishName: "",
    weight: "",
    rodLength: "",
    reelType: "",
    lineType: "",
    lineThickness: "",
    tackleDetail: "",
    tideLevel: "",
    highTideTime: "",
    tideTypeDetail: "",
    transparency: "",
    fishingMethodDetail: "",
    accessoryInfo: "",
    additionalComment: "",
    contributor: "",
    photoService: "",
  });

  const fishingTypeOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "ルアー", value: "1" },
    { label: "エサ釣り", value: "2" },
    { label: "フライ", value: "3" },
  ];

  const tideOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "大潮", value: "1" },
    { label: "中潮", value: "2" },
    { label: "小潮", value: "3" },
  ];

  const weatherOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "晴れ", value: "1" },
    { label: "曇り", value: "2" },
    { label: "雨", value: "3" },
  ];

  const windDirectionOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "北", value: "1" },
    { label: "北東", value: "2" },
    { label: "東", value: "3" },
    { label: "南東", value: "4" },
    { label: "南", value: "5" },
    { label: "南西", value: "6" },
    { label: "西", value: "7" },
    { label: "北西", value: "8" },
  ];

  const waterQualityOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "淡水", value: "1" },
    { label: "汽水", value: "2" },
    { label: "海水", value: "3" },
  ];

  const toolOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "スピニング", value: "1" },
    { label: "ベイト", value: "2" },
    { label: "餌木", value: "3" },
  ];

  const tackleOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "ジグ", value: "1" },
    { label: "ワーム", value: "2" },
    { label: "ウキ", value: "3" },
  ];

  const baitOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "エビ", value: "1" },
    { label: "ゴカイ", value: "2" },
    { label: "オキアミ", value: "3" },
  ];

  const hitPatternOptions: SelectOption[] = [
    { label: "選択してください", value: "" },
    { label: "ボトム", value: "1" },
    { label: "中層", value: "2" },
    { label: "表層", value: "3" },
  ];

  const handleNumberChange =
    (key: NumericField) => (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.value === "" ? null : Number(event.target.value);
      updateInputForm({ key, value });
    };

  const handleSelectNumberChange =
    (key: NumericField) =>
    (value: string): void => {
      updateInputForm({
        key,
        value: value === "" ? null : Number(value),
      });
    };

  const handleStringChange =
    (key: "catchDateTime" | "note") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateInputForm({ key, value: event.target.value });
    };

  const handleBooleanChange =
    (key: "isReleased") =>
    (value: string): void => {
      updateInputForm({ key, value: value === "true" });
    };

  const handleExtraInputChange =
    (key: keyof typeof extraValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setExtraValues((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleExtraTextAreaChange =
    (key: keyof typeof extraValues) =>
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setExtraValues((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = () => {
    if (!canSubmit || !submissionPayload) {
      markResult({
        status: "error",
        message: "入力項目を確認してください",
      });
      return;
    }

    markSubmitting();
    setTimeout(() => {
      console.info("送信ペイロード", submissionPayload);
      markResult({
        status: "success",
        message: "ダミーリクエストを送信しました",
      });
    }, 400);
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <Label text="日付" />
        <CalendarButton />
        <Label text="開始時間" />
        <TextField
          label="開始時間"
          name="startTime"
          type="time"
          value={extraValues.startTime}
          onChange={handleExtraInputChange("startTime")}
          size="md"
          width="100%"
        />
        <Label text="終了時間" />
        <TextField
          label="終了時間"
          name="endTime"
          type="time"
          value={extraValues.endTime}
          onChange={handleExtraInputChange("endTime")}
          size="md"
          width="100%"
        />
        <Label text="釣果日時" />
        <TextField
          label="釣果日時"
          name="catchDateTime"
          type="datetime-local"
          value={formValues.catchDateTime}
          onChange={handleStringChange("catchDateTime")}
          error={errors.catchDateTime}
          size="md"
          width="100%"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="釣果場所" />
        <TextField
          label="釣果場所ID"
          name="fishingTripId"
          type="number"
          value={formValues.fishingTripId?.toString() ?? ""}
          onChange={handleNumberChange("fishingTripId")}
          error={errors.fishingTripId}
          size="md"
          width="100%"
        />
        <Label text="場所（都道府県など）" />
        <TextField
          label="場所（都道府県など）"
          name="locationName"
          value={extraValues.locationName}
          onChange={handleExtraInputChange("locationName")}
          size="md"
          width="100%"
        />
        <Label text="経度" />
        <TextField
          label="経度"
          name="longitude"
          value={extraValues.longitude}
          onChange={handleExtraInputChange("longitude")}
          size="md"
          width="100%"
        />
        <Label text="緯度" />
        <TextField
          label="緯度"
          name="latitude"
          value={extraValues.latitude}
          onChange={handleExtraInputChange("latitude")}
          size="md"
          width="100%"
        />
        <Label text="釣果連番" />
        <TextField
          label="釣果連番"
          name="sequenceNo"
          type="number"
          value={formValues.sequenceNo?.toString() ?? ""}
          onChange={handleNumberChange("sequenceNo")}
          error={errors.sequenceNo}
          size="md"
          width="100%"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="潮" />
        <SelectBox
          options={tideOptions}
          value={formValues.tideCondition?.toString() ?? ""}
          onChange={handleSelectNumberChange("tideCondition")}
          placeholder="潮を選択"
        />
        <Label text="潮の流れ" />
        <TextField
          label="潮の流れ"
          name="tideTypeDetail"
          value={extraValues.tideTypeDetail}
          onChange={handleExtraInputChange("tideTypeDetail")}
          size="md"
          width="100%"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="釣果メンバー" />
        <TextField
          label="メンバーID"
          name="memberId"
          type="number"
          value={formValues.memberId?.toString() ?? ""}
          onChange={handleNumberChange("memberId")}
          error={errors.memberId}
          size="md"
          width="100%"
        />
        <AddMemberButton />
      </div>

      <div style={sectionStyle}>
        <Label text="魚種" />
        <SelectBox
          options={[
            { label: "選択してください", value: "" },
            { label: "シーバス", value: "1" },
            { label: "アジ", value: "2" },
            { label: "メバル", value: "3" },
          ]}
          value={formValues.fishId?.toString() ?? ""}
          onChange={handleSelectNumberChange("fishId")}
          placeholder="魚種を選択"
        />
        {errors.fishId && (
          <span style={{ color: "red" }}>{errors.fishId}</span>
        )}
        <Label text="魚の名前" />
        <TextField
          label="魚の名前"
          name="fishName"
          value={extraValues.fishName}
          onChange={handleExtraInputChange("fishName")}
          size="md"
          width="100%"
        />
        <Label text="魚ID" />
        <TextField
          label="魚ID"
          name="fishId"
          type="number"
          value={formValues.fishId?.toString() ?? ""}
          onChange={handleNumberChange("fishId")}
          error={errors.fishId}
          size="md"
          width="100%"
        />
        <Label text="サイズ" />
        <TextField
          label="サイズ"
          name="size"
          type="number"
          value={formValues.size?.toString() ?? ""}
          onChange={handleNumberChange("size")}
          size="md"
          width="100%"
        />
        <Label text="重さ" />
        <TextField
          label="重さ"
          name="weight"
          type="number"
          value={extraValues.weight}
          onChange={handleExtraInputChange("weight")}
          size="md"
          width="100%"
        />
        <Label text="キャッチリリース" />
        <SelectBox
          options={[
            { label: "リリースする", value: "true" },
            { label: "キープする", value: "false" },
          ]}
          value={formValues.isReleased ? "true" : "false"}
          onChange={handleBooleanChange("isReleased")}
          placeholder="選択してください"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="使用した道具" />
        <SelectBox
          options={toolOptions}
          value={formValues.toolId?.toString() ?? ""}
          onChange={handleSelectNumberChange("toolId")}
          placeholder="使用した道具"
        />
        <Label text="竿の長さ" />
        <TextField
          label="竿の長さ"
          name="rodLength"
          value={extraValues.rodLength}
          onChange={handleExtraInputChange("rodLength")}
          size="md"
          width="100%"
        />
        <Label text="リールの種類" />
        <TextField
          label="リールの種類"
          name="reelType"
          value={extraValues.reelType}
          onChange={handleExtraInputChange("reelType")}
          size="md"
          width="100%"
        />
        <Label text="ラインの種類" />
        <TextField
          label="ラインの種類"
          name="lineType"
          value={extraValues.lineType}
          onChange={handleExtraInputChange("lineType")}
          size="md"
          width="100%"
        />
        <Label text="ラインの太さ" />
        <TextField
          label="ラインの太さ"
          name="lineThickness"
          value={extraValues.lineThickness}
          onChange={handleExtraInputChange("lineThickness")}
          size="md"
          width="100%"
        />
        <Label text="仕掛けの詳細（例：針の種類、ハリスの長さ、フックのサイズ）" />
        <TextAreaInput
          label="仕掛けの詳細"
          value={extraValues.tackleDetail}
          onChange={handleExtraTextAreaChange("tackleDetail")}
          placeholder="仕掛けの情報を入力してください"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="天気" />
        <SelectBox
          options={weatherOptions}
          value={formValues.weather?.toString() ?? ""}
          onChange={handleSelectNumberChange("weather")}
          placeholder="天気を選択"
        />
        <Label text="風速" />
        <TextField
          label="風速"
          name="windSpeed"
          type="number"
          value={formValues.windSpeed?.toString() ?? ""}
          onChange={handleNumberChange("windSpeed")}
          size="md"
          width="100%"
        />
        <Label text="風向" />
        <SelectBox
          options={windDirectionOptions}
          value={formValues.windDirection?.toString() ?? ""}
          onChange={handleSelectNumberChange("windDirection")}
          placeholder="風向を選択"
        />
        <Label text="水温" />
        <TextField
          label="水温"
          name="waterTemperature"
          type="number"
          value={formValues.waterTemperature?.toString() ?? ""}
          onChange={handleNumberChange("waterTemperature")}
          size="md"
          width="100%"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="波の高さ" />
        <TextField
          label="波の高さ"
          name="waveHeight"
          type="number"
          value={formValues.waveHeight?.toString() ?? ""}
          onChange={handleNumberChange("waveHeight")}
          size="md"
          width="100%"
        />
        <Label text="水質" />
        <SelectBox
          options={waterQualityOptions}
          value={formValues.waterQualityId?.toString() ?? ""}
          onChange={handleSelectNumberChange("waterQualityId")}
          placeholder="水質を選択"
        />
        <Label text="ヒットタイミング" />
        <SelectBox
          options={hitPatternOptions}
          value={formValues.hitPattern?.toString() ?? ""}
          onChange={handleSelectNumberChange("hitPattern")}
          placeholder="ヒットパターンを選択"
        />
        <Label text="釣り場の詳細" />
        <TextAreaInput
          label={`メモ（${formValues.note.length}/500文字）`}
          value={formValues.note}
          onChange={handleStringChange("note")}
          placeholder="釣り場の状況などを記録してください"
        />
        {errors.note && <span style={{ color: "red" }}>{errors.note}</span>}
      </div>

      <div style={sectionStyle}>
        <Label text="潮汐" />
        <SelectBox
          options={tideOptions}
          value={formValues.tideCondition?.toString() ?? ""}
          onChange={handleSelectNumberChange("tideCondition")}
          placeholder="潮汐を選択"
        />
        <Label text="潮位" />
        <TextField
          label="潮位"
          name="tideLevel"
          value={extraValues.tideLevel}
          onChange={handleExtraInputChange("tideLevel")}
          size="md"
          width="100%"
        />
        <Label text="満潮時刻" />
        <TextField
          label="満潮時刻"
          name="highTideTime"
          type="time"
          value={extraValues.highTideTime}
          onChange={handleExtraInputChange("highTideTime")}
          size="md"
          width="100%"
        />
        <Label text="潮の種類" />
        <TextField
          label="潮の種類"
          name="tideTypeDetail"
          value={extraValues.tideTypeDetail}
          onChange={handleExtraInputChange("tideTypeDetail")}
          size="md"
          width="100%"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="水深" />
        <TextField
          label="水深"
          name="depth"
          type="number"
          value={formValues.depth?.toString() ?? ""}
          onChange={handleNumberChange("depth")}
          size="md"
          width="100%"
        />
        <Label text="透明度" />
        <TextField
          label="透明度"
          name="transparency"
          value={extraValues.transparency}
          onChange={handleExtraInputChange("transparency")}
          size="md"
          width="100%"
        />
        <Label text="釣法の種類" />
        <SelectBox
          options={fishingTypeOptions}
          value={formValues.fishingTypeId?.toString() ?? ""}
          onChange={handleSelectNumberChange("fishingTypeId")}
          placeholder="釣法を選択"
        />
        <Label text="釣法の詳細" />
        <TextAreaInput
          label="釣法の詳細"
          value={extraValues.fishingMethodDetail}
          onChange={handleExtraTextAreaChange("fishingMethodDetail")}
          placeholder="釣法の工夫を記入してください"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="餌" />
        <SelectBox
          options={baitOptions}
          value={formValues.baitId?.toString() ?? ""}
          onChange={handleSelectNumberChange("baitId")}
          placeholder="餌を選択"
        />
        <Label text="仕掛け" />
        <SelectBox
          options={tackleOptions}
          value={formValues.tackleId?.toString() ?? ""}
          onChange={handleSelectNumberChange("tackleId")}
          placeholder="仕掛けを選択"
        />
        <Label text="ヒットパターン" />
        <SelectBox
          options={hitPatternOptions}
          value={formValues.hitPattern?.toString() ?? ""}
          onChange={handleSelectNumberChange("hitPattern")}
          placeholder="ヒットパターンを選択"
        />
        <Label text="その他使用した小物の情報" />
        <TextAreaInput
          label="その他使用した小物の情報"
          value={extraValues.accessoryInfo}
          onChange={handleExtraTextAreaChange("accessoryInfo")}
          placeholder="スナップやシンカーなど"
        />
      </div>

      <div style={sectionStyle}>
        <Label text="釣果に関するコメント" />
        <TextAreaInput
          label="釣果に関するコメント"
          value={extraValues.additionalComment}
          onChange={handleExtraTextAreaChange("additionalComment")}
          placeholder="自由記入"
        />
        <Label text="投稿者" />
        <TextField
          label="投稿者"
          name="contributor"
          value={extraValues.contributor}
          onChange={handleExtraInputChange("contributor")}
          size="md"
          width="100%"
        />
        <Label text="写真のサービス" />
        <TextField
          label="写真のサービス"
          name="photoService"
          value={extraValues.photoService}
          onChange={handleExtraInputChange("photoService")}
          size="md"
          width="100%"
        />
      </div>

      <InputFormSubmitButton
        onClick={handleSubmit}
        disabled={!canSubmit || status === "submitting"}
      />
      <InputFormResetButton />
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
