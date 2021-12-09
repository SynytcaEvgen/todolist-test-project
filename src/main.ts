import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { JwtAuthGaurd } from './modules/auth/jwt-auth.guard';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('To Do List')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Synytsia Yevhen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // const newGuard = new JwtAuthGaurd();
  // app.useGlobalGuards(newGuard);

  await app.listen(PORT, () => console.log(`Srever started on port - ${PORT}`));
}
start();
