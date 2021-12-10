import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGaurd } from '../../auth/jwt-auth.guard';
import { ValidationPipe } from '../../pipe/validation.pipe';

import { User } from '../entitys/users.entity';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from './user.dto';

@ApiTags('Users')
@Controller('rest/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGaurd)
  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    if (users === undefined) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }
  @ApiOperation({ summary: 'Singin user' })
  @ApiResponse({ status: 200, type: User, description: 'singin user' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = CreateUserDto.name;
    user.email = CreateUserDto.email;
    user.password = CreateUserDto.password;
    return this.usersService.create(user);
  }
}
