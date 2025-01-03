import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { NacosModule, NacosService } from '@libs/nacos';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserAdapterService } from './userService.service';
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        level: 'debug',
        transports: [
          new winston.transports.File({
            filename: `${process.cwd()}/log`,
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
        ],
      }),
    }),
    NacosModule,
  ],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    {
      provide: 'USER_SERVICE',
      useFactory: async (nacosService: NacosService) => {
        // TODO: 补齐类型
        const serviceInstance: any = await nacosService.discoverService('user');
        console.log(
          `-----------------------------------------------------------------------------------------${serviceInstance[0].ip}`,
        );
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: serviceInstance[0].ip,
            port: serviceInstance[0].port,
          },
        });
      },
      inject: [NacosService],
    },
    UserAdapterService,
  ],
})
export class GatewayModule {}
