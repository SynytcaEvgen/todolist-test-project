import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ToDoModule } from './modules/todo/todo.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ToDoModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
