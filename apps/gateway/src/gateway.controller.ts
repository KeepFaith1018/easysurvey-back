import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { UserAdapterService } from './userService.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Inject()
  private readonly userAdapterService: UserAdapterService;

  @Post('register')
  async registerUser(@Body() data: any) {
    return this.userAdapterService.registerUser(data);
  }
}
