import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/controller/user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/entitys/users.entity';

@ApiTags('Аuthorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registaration')
  registaration(@Body() user: User) {
    return this.authService.registaration(user);
  }
}
