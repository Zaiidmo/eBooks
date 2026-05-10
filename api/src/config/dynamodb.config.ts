import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";


@Injectable()
export class DynamoDBConfigService {
    private readonly client: DynamoDBClient;

    constructor() {
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    getClient(): DynamoDBClient {
        return this.client;
    }
}