import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ToDoService } from '../services/todo.service';
import { ToDo } from '../entitys/todo.entity';
import { CreateDto, UpdateDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotFoundResponse } from '../controller/type.response';

@Controller('rest/doto')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}
  @ApiOperation({ summary: 'Get all entries from to-do list' })
  @ApiResponse({ status: 200, type: [ToDo] })
  @Get()
  async getData(): Promise<ToDo[]> {
    const todoArry = await this.toDoService.findAll();
    if (todoArry === undefined) {
      throw new NotFoundException(`Todo with not found`);
    }
    todoArry.sort((a, b) => {
      const dateA = Date.parse(String(a.updated_at));
      const dateB = Date.parse(String(b.updated_at));
      // const dateA = a.id;
      // const dateB = b.id;
      console.log(dateB - dateA);
      console.log(dateB);
      console.log(dateA);
      return dateB - dateA;
    });
    return todoArry;
  }
  @ApiOperation({ summary: 'Save some entry to to-do list' })
  @ApiResponse({ status: 200, type: ToDo, description: 'create to-do' })
  @ApiBody({ type: CreateDto })
  @Post()
  saveData(@Body() CreateDto: CreateDto): Promise<ToDo> {
    const todo = new ToDo();
    todo.title = CreateDto.title;
    if (CreateDto.isComplited != undefined) {
      todo.isComplited = CreateDto.isComplited;
    }
    return this.toDoService.create(todo);
  }
  @ApiOperation({ summary: 'Change by id some entry to to-do list' })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 200, description: 'change to-do' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() UpdateDto: UpdateDto
  ): Promise<ToDo> {
    const todo = await this.toDoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id - ${id} not found`);
    }
    todo.title = UpdateDto.title;
    todo.isComplited = UpdateDto.isComplited;
    return this.toDoService.update(todo);
  }
  @ApiOperation({ summary: 'Delete by id some entry to to-do list' })
  @ApiResponse({ status: 200, description: 'create to-do' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @Delete(':id')
  async deletData(@Param('id') id: string): Promise<object> {
    const todoItem = await this.toDoService.findOne(id);
    const mess = {
      action: 'Delete',
      status: 'success',
      delete_obj_id: id,
    };
    if (todoItem === undefined) {
      throw new NotFoundException(`Todo with id - ${id} not found`);
    }
    await this.toDoService.remove(id);
    return mess;
  }
}
