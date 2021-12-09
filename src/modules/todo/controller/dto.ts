import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty({ example: 'some to-do item', description: 'to-do item' })
  title: string;
  // @ApiProperty({ required: false })
  // isComplited?: boolean;
}

export class UpdateDto {
  @ApiProperty({
    example: 'some to-do item',
    description: 'to-do item',
    required: false,
  })
  title: string;
  @ApiProperty({
    example: false,
    description: 'true or false',
    required: false,
  })
  isComplited?: boolean;
}
