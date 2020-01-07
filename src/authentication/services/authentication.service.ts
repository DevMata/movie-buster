import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserBody } from '../dto/userbody.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<UserBody> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && compareSync(password, user.password)) {
      const { userId, email } = user;
      return { userId, email };
    }
    return null;
  }

  async login(user: UserBody): Promise<{ accessToken: string }> {
    const payload = { username: user.email, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
