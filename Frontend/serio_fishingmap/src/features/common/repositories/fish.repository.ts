import { ScanCommand, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/lib/dynamodb";
import { randomUUID } from "crypto";
import { FishRecord, CreateFishRecordDTO } from "../../../types/fish-record-dto"; // 分離した型定義をインポート

const TABLE_NAME = process.env.DYNAMODB_FISH_TABLE_NAME;

class FishRepository {
  /**
   * すべての釣果記録を取得する
   */
  async getAll(): Promise<FishRecord[]> {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await ddbDocClient.send(command);
    return (response.Items as FishRecord[]) || [];
  }

  /**
   * IDで単一の釣果記録を取得する
   */
  async getById(id: string): Promise<FishRecord | undefined> {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });
    const response = await ddbDocClient.send(command);
    return response.Item as FishRecord | undefined;
  }

  /**
   * 新しい釣果記録を作成する
   */
  async create(recordData: CreateFishRecordDTO): Promise<FishRecord> {
    const newItem: FishRecord = {
      id: randomUUID(),
      ...recordData,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: newItem,
    });

    await ddbDocClient.send(command);
    return newItem;
  }
}

// FishRepositoryのインスタンスを作成してエクスポート
// これにより、他のファイルからは new FishRepository() せずにすぐ使える
export const fishRepository = new FishRepository();