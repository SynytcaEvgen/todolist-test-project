import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ToDoController } from './controller/todo.controller';
import { ToDo } from './entitys/todo.entity';
import { User } from '../users/entitys/users.entity';
import { ToDoService } from './services/todo.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToDo, User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    }),
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
