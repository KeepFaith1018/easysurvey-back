import { Controller, Inject } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AnswerController {
  @Inject('SURVEY_SERVICE')
  private readonly surveyService: ClientProxy;
  constructor(private readonly answerService: AnswerService) {

  }
}
