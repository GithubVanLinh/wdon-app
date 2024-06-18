import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './service';
import { LocalAuthGuard } from './guard/local';
import { Public } from './decorators/public';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Public()
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/test')
  async test(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/test_auth')
  getProfile(@Request() req) {
    return req.user;
  }
}
