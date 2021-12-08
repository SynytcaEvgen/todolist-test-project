import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from '../entitys/users.entity';
@Controller('rest/users')
export class UsersController {
  @Get()
  getData(): string {
    return 'hello todo controller';
  }
  @Post()
  saveData(@Body() user: User): User {
    console.log(user);
    return user;
  }
}
