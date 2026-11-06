
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  isbn?: string;

  @IsInt()
  @Min(0)
  @Max(100000)
  totalCopies: number;

  @IsInt()
  @Min(1)
  genreId: number;
}
