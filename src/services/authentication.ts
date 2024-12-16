import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import dotenv from 'dotenv';

// Nạp biến môi trường từ tệp .env
dotenv.config();
interface User {
  id: string;
}

class UserIdentityService {
  private JWT_SECRET: Secret;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET as Secret;
  }

  async sign(userID: String): Promise<string> {
    return jwt.sign({ userID }, this.JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
  }

  verify(token: string): string | JwtPayload {
    return jwt.verify(token, this.JWT_SECRET);
  }

  assignUserRequestContext(user: User, req: Request): void {
    (req as any).user = user;
  }
}

export default new UserIdentityService();
