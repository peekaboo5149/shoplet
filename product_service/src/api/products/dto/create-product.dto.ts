import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsPositive,
} from 'class-validator'

export class CreateProductDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(0, { message: 'Price cannot be less than 0' })
  readonly price: number
}
