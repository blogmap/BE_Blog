import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

interface User {
  id: string;
}

class UserIdentityService {
  private JWT_SECRET: Secret;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET as Secret;
  }

  async sign(user: User): Promise<string> {
    return jwt.sign({ id: user.id }, this.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
  }

  verify(token: string): string | JwtPayload {
    return jwt.verify(token, this.JWT_SECRET);
  }

  assignUserRequestContext(user: User, request: Request): void {
    (request as any).user = user;
  }
}

export default new UserIdentityService();
