import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

type BuildKey<C, K> = (input: C) => K;
type BuildItem<T, C, K> = (input: C, key: K) => T;

type DynamoKey = Record<string, unknown>;

export class BaseRepository<T, C, K extends DynamoKey> {
  private readonly tableName: string;

  constructor(
    private readonly client: DynamoDBDocumentClient,
    tableName: string | undefined,
    private readonly buildKey: BuildKey<C, K>,
    private readonly buildItem: BuildItem<T, C, K>
  ) {
    if (!tableName) throw new Error("tableName is required");
    this.tableName = tableName;
  }

  async getAll(): Promise<T[]> {
    const res = await this.client.send(
      new ScanCommand({ TableName: this.tableName })
    );

    // res.Items は undefined の可能性があるので ?? で安全に
    const items = (res.Items ?? []) as T[];
    return items;
  }

  async getById(key: K): Promise<T | null> {
    const res = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: key })
    );

    return (res.Item as T) ?? null;
  }

  async create(input: C): Promise<T> {
    const key = this.buildKey(input);
    const item = this.buildItem(input, key);

    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item as Record<string, unknown>,
      })
    );

    return item;
  }
}
