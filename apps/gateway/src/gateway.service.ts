import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  getHello(): string {
    return 'Hello World!';
  }
}
