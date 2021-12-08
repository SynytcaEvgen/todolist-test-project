import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoModule } from './modules/todo/todo.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ToDoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
