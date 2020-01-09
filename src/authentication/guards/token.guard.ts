import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../dto/token-payload.dto';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    @InjectRepository(AccessToken)
    private readonly tokenRepository: Repository<AccessToken>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();

      const bearer = req.headers.authorization.split(' ')[1];

      const tokenPayload: TokenPayload = this.jwtService.verify(bearer);

      const res = await this.tokenRepository.findOne({ jti: tokenPayload.jti });

      return res ? true : false;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
