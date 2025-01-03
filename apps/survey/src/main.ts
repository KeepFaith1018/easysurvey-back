import { NestFactory } from '@nestjs/core';
import { SurveyModule } from './survey.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosService } from '@libs/nacos';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SurveyModule,
    {
      transport: Transport.TCP,
      options: { port: 3003 },
    },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const nacosService = app.get(NacosService);
  await nacosService.registerService({
    serviceName: 'survey',
    ip: '127.0.0.1',
    port: 3003,
  });
  await app.listen();
}
bootstrap();
