import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ToDo } from '../../todo/entitys/todo.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Name user',
    description: 'User name',
  })
  @Column({ type: 'text', name: 'userName' })
  name: string;

  @ApiProperty({ example: 'examplemail@mail.com', description: 'User Email' })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({ example: '1234567890', description: 'User password' })
  @Column('text')
  password: string;

  @ApiProperty({
    example: 'date',
    description: 'Data singin user',
    required: false,
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  singin_date: Date;

  @OneToMany(() => ToDo, (todo) => todo.user)
  todo: ToDo[];
}
