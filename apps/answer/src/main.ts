import { NestFactory } from '@nestjs/core';
import { AnswerModule } from './answer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosService } from '@libs/nacos';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AnswerModule,
    {
      transport: Transport.TCP,
      options: { port: 3002 },
    },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const nacosService = app.get(NacosService);
  await nacosService.registerService({
    serviceName: 'answer',
    ip: '127.0.0.1',
    port: 3002,
  });
  await app.listen();
}
bootstrap();
