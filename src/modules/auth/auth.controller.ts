import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../users/controller/user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Аuthorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registaration')
  registaration(@Body() userDto: CreateUserDto) {
    return this.authService.registaration(userDto);
  }
}
