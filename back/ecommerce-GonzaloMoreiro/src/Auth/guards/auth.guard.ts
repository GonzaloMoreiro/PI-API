import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('Bearer token not found');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const user = await this.jwtService.verifyAsync(token, { secret });
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.exp * 1000);

      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException('invalid token');
    }
  }
}
