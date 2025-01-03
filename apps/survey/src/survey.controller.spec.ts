import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

describe('SurveyController', () => {
  let surveyController: SurveyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [SurveyService],
    }).compile();

    surveyController = app.get<SurveyController>(SurveyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(surveyController.getHello()).toBe('Hello World!');
    });
  });
});
