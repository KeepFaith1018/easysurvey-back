import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyService {
  getHello(): string {
    return 'Hello World!';
  }
}
