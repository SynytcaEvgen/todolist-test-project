import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { User } from './entitys/users.entity';
import { ToDo } from '../todo/entitys/todo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ToDo]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, AuthModule],
})
export class UsersModule {}
