import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = this.extractToken(client);

    if (!token) throw new UnauthorizedException('Token ausente');

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload; 
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractToken(client: Socket): string | undefined {
    const auth = client.handshake.auth?.token || client.handshake.headers?.authorization;
    return auth?.split(' ')[1]; // remove "Bearer "
  }
}