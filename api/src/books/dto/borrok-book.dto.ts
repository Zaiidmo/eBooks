import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDto {
  @IsNotEmpty()
  @IsString()
  userId: String;
}
