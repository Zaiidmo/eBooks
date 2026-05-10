import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBConfigService } from './config/dynamodb.config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, DynamoDBConfigService],
  exports: [DynamoDBConfigService],
})
export class AppModule {}
