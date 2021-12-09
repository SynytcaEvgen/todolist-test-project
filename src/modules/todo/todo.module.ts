import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ToDoController } from './controller/todo.controller';
import { ToDo } from './entitys/todo.entity';
import { User } from '../users/entitys/users.entity';
import { ToDoService } from './services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo, User])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
