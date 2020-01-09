import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserPayload } from '../dto/user-payload.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<UserPayload> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && compareSync(password, user.password)) {
      const { userId, email } = user;
      return { userId, email };
    }
    return null;
  }

  async login(user: UserPayload): Promise<{ accessToken: string }> {
    const payload = { username: user.email, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
