import { Test, TestingModule } from '@nestjs/testing';
import { NacosService } from './nacos.service';

describe('NacosService', () => {
  let service: NacosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NacosService],
    }).compile();

    service = module.get<NacosService>(NacosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
