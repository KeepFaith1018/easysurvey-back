import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosService } from '@libs/nacos';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: { port: 3004 },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const nacosService = app.get(NacosService);
  await nacosService.registerService({
    serviceName: 'user',
    ip: '127.0.0.1',
    port: 3004,
  });
  await app.listen();
}
bootstrap();
