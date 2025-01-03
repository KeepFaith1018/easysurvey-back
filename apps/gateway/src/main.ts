import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosService } from '@libs/nacos';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3000 },
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const nacosService = app.get(NacosService);
  await nacosService.registerService({
    serviceName: 'gateway',
    ip: '127.0.0.1',
    port: 3000,
  });
  await app.startAllMicroservices();
  await app.listen(2999);
}
bootstrap();
