import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entitys/users.entity';

@Entity({ name: 'to-do' })
export class ToDo {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'some text', description: 'Text to-do' })
  @Column('text')
  title: string;

  @ApiProperty({
    example: 'false',
    description: 'Progress indicator',
    required: false,
  })
  @Column({ default: false })
  isComplited: boolean;

  @ApiProperty({
    example: 'date',
    description: 'Data create entry',
    required: false,
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  created_at: Date;

  @ApiProperty({
    example: 'date',
    description: 'Data update entry',
    required: false,
  })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todo)
  user: User;
}
