import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

type BuildKey<C, K> = (input: C) => K;
type BuildItem<T, C, K> = (input: C, key: K) => T;

export class BaseRepository<T, C, K> {
  constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string | undefined,
    private readonly buildKey: BuildKey<C, K>,
    private readonly buildItem: BuildItem<T, C, K>
  ) {
    if (!tableName) throw new Error("tableName is required");
  }

  async getAll(): Promise<T[]> {
    const res = await this.client.send(
      new ScanCommand({ TableName: this.tableName })
    );
    return res.Items as T[];
  }

  async getById(key: K): Promise<T | null> {
    const res = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: key as any })
    );
    return (res.Item as T) ?? null;
  }

  async create(input: C): Promise<T> {
    const key = this.buildKey(input);
    const item = this.buildItem(input, key);
    await this.client.send(
      new PutCommand({ TableName: this.tableName, Item: item as any })
    );
    return item;
  }
}
