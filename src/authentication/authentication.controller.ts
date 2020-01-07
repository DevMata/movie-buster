import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from './dto/user-payload.dto';

@Controller('login')
export class AuthenticationController {
  constructor(private readonly loginService: AuthenticationService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async login(
    @LoggedUser() user: UserPayload,
  ): Promise<{ accessToken: string }> {
    return this.loginService.login(user);
  }
}
