import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@libs/prisma';
import { RedisModule } from '@libs/redis';
import { NacosModule } from '@libs/nacos';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
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
    PrismaModule,
    RedisModule,
    NacosModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
