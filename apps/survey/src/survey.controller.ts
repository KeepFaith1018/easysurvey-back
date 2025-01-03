import { Controller, Get, Inject } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { RedisService } from '@libs/redis';

@Controller()
export class SurveyController {
  @Inject(RedisService)
  private redisService: RedisService;
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.surveyService.getHello() + keys;
  }
}
