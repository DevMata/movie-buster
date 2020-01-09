import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserPayload } from '../dto/user-payload.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(AccessToken)
    private readonly tokenRepository: Repository<AccessToken>,
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
    const jti: string = randomStringGenerator();

    await this.tokenRepository.save({ jti, userId: user.userId });

    const payload = { username: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, {
        jwtid: jti,
      }),
    };
  }
}
