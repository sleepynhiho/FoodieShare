import { IsInt, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;
}