import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ToDoService } from '../services/todo.service';
import { ToDo } from '../entitys/todo.entity';
import { CreateDto, UpdateDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundResponse } from '../controller/type.response';
import { JwtAuthGaurd } from 'src/modules/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/modules/pipe/validation.pipe';

@ApiTags('To-do list')
@Controller('rest/todo')
export class ToDoController {
  constructor(
    private readonly toDoService: ToDoService,
    private readonly jwtService: JwtService
  ) {}

  @ApiOperation({ summary: 'Get all entries from to-do list for user' })
  @ApiResponse({ status: 200, type: [ToDo] })
  @UseGuards(JwtAuthGaurd)
  @Get()
  async getData(@Request() req): Promise<ToDo[]> {
    const userId = await this.decodeToken(req.headers.authorization);
    const todoArry = await this.toDoService.findByToken(userId);
    if (!todoArry.length) {
      throw new NotFoundException(`To-do list not found`);
    }
    todoArry.sort((a, b) => {
      const dateA = Date.parse(String(a.updated_at));
      const dateB = Date.parse(String(b.updated_at));
      return dateB - dateA;
    });
    return todoArry;
  }
  @ApiOperation({ summary: 'Save some entry to to-do list for user' })
  @ApiResponse({ status: 200, type: ToDo, description: 'create to-do' })
  @ApiBody({ type: CreateDto })
  @UseGuards(JwtAuthGaurd)
  @UsePipes(ValidationPipe)
  @Post()
  async saveData(@Body() CreateDto: CreateDto, @Request() req): Promise<ToDo> {
    const todo = new ToDo();
    todo.title = CreateDto.title;
    todo.user = await this.decodeToken(req.headers.authorization);
    return this.toDoService.create(todo);
  }
  @ApiOperation({ summary: 'Change by id some entry to to-do list for user' })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 200, description: 'change to-do' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @UseGuards(JwtAuthGaurd)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() UpdateDto: UpdateDto,
    @Request() req
  ): Promise<ToDo> {
    const userId = await this.decodeToken(req.headers.authorization);
    const todo = await this.toDoService.findOne(id, userId);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id - ${id} not found`);
    }
    todo.title = UpdateDto.title;
    todo.isComplited = UpdateDto.isComplited;
    return this.toDoService.update(todo);
  }
  @ApiOperation({ summary: 'Delete by id some entry to to-do list for user' })
  @ApiResponse({ status: 200, description: 'delete to-do by id' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async deletData(@Param('id') id: string, @Request() req): Promise<object> {
    const userId = await this.decodeToken(req.headers.authorization);
    const todoItem = await this.toDoService.findOne(id, userId);
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

  private async decodeToken(headers: string) {
    const token = headers.split(' ')[1];
    const obj: any = this.jwtService.decode(token);
    return obj.id;
  }
}
