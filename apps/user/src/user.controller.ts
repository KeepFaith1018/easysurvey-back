import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user')
  async register(registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}
