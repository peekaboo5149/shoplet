import { IsString, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsString({ message: 'Label must be a string' })
  @IsNotEmpty({ message: 'Label is required' })
  readonly label: string
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string
}
