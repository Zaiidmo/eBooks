import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";


export class ReturnBookDto {
    @IsNotEmpty()
    @IsString()
    userId: String;
}