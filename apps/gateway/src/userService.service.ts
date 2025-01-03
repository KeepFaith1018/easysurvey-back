import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class UserAdapterService {
  @Inject('USER_SERVICE') private readonly userClient: ClientProxy;

  private readonly logger = new Logger(UserAdapterService.name);

  async registerUser(data: any) {
    this.logger.debug('收到请求' + data);
    const result = await firstValueFrom(this.userClient.send('user', data));
    this.logger.debug('返回' + result);
    return result;
  }
}
