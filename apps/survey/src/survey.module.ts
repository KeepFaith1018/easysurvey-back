import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
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
    RedisModule,
    NacosModule,
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
