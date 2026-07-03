import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from './dtos/register-request.dto';
import { UserService } from 'src/user/user.service';
import { LoginRequest } from './dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entity/user.entity';
import { LoginResponse } from './dtos/login-response.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,private jwtService: JwtService) {}

  async register(req: RegisterRequest) {
    let user;
    try {
      user = await this.userService.getByEmail(req.email);
    } catch (error) {
      user = null;
    }
    if (user) {
      throw new BadRequestException('Email already in use.');
    }
    const hashedPassword = await bcrypt.hash(req.password, 10);
    return await this.userService.create(req.name, hashedPassword, req.email, req.location, req.age);
  }

  async login(req: LoginRequest) {
    const user = await this.userService.getByEmail(req.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(req.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Wrong credentials.');
    }

    const tokenRes = await this.generateToken(user);
    return tokenRes;
  }

  private async generateToken(user: UserEntity): Promise<LoginResponse> {
    const token = this.jwtService.sign({sub: user.id, email: user.email,username: user.name}, { expiresIn: '1d' });
    return {
      access_token: token,
      expires_in: 60 * 60 * 24 * 1000,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
