import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public';
import { CreateUserDto } from './dto/create';
import { UserService } from './service';
import { AuthType } from '../auth/model/auth.schema';
import { ProfileId } from '../auth/decorators/user';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser({
      ...body,
      firstName: body.firstName,
      lastName: body.lastName,
      authType: AuthType.LOCAL,
      username: body.username,
      password: body.password,
    });
  }

  @Get('/')
  async getProfile(@ProfileId() profileId: string) {
    return await this.userService.getProfileById(profileId);
  }

  @Public()
  @Post('/test')
  async testPost() {}
}
