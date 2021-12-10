import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @ApiProperty({ example: 'some to-do item', description: 'to-do item' })
  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Field title should be has some message' })
  title: string;
}

export class UpdateDto {
  @ApiProperty({
    example: 'some to-do item',
    description: 'to-do item',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: false,
    description: 'true or false',
    required: false,
  })
  @IsBoolean({ message: 'Should be true or false' })
  @IsOptional()
  isComplited?: boolean;
}
