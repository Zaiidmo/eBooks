import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { S3ConfigService } from '@/services/s3.service';
import { DynamoDBConfigService } from '@/config/dynamodb.config';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, S3ConfigService, DynamoDBConfigService],
})
export class BooksModule {}
