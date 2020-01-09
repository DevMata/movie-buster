import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<{ accessToken: string }> {
    return this.authenticationService.login(req.user);
  }
}
