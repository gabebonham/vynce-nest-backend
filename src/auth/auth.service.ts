import { Injectable } from '@nestjs/common';
import { RegisterRequest } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  async register(req: RegisterRequest) {
  }
}
