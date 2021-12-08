import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDo } from '../entitys/todo.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>
  ) {}

  findAll(): Promise<ToDo[]> {
    return this.toDoRepository.find();
  }

  findOne(id: string): Promise<ToDo> {
    return this.toDoRepository.findOne(id);
  }

  create(toDo: ToDo): Promise<ToDo> {
    return this.toDoRepository.save(toDo);
  }

  update(toDo: ToDo): Promise<ToDo> {
    return this.toDoRepository.save(toDo);
  }

  async remove(id: string): Promise<void> {
    await this.toDoRepository.delete(id);
  }
}
