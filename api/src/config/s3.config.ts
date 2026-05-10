import { S3 } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";


@Injectable()
export class S3ConfigService {
    private readonly client: any;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    getClient(): any {
        return this.client;
    }
}