import { NextFunction, Request, Response } from "express";
import UserIdentityService from "../services/authentication";
import ResponseBuilder from "../handler/responseBuilder";
import { AppDataSource } from "../database/config";
import User from "../database/models/User"
interface JwtPayload {
  userID: string;
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  if (req.cookies.jwt || req.headers.authorization) {
    // Cookie based
    if (req.cookies.jwt) {
      const payload = UserIdentityService.verify(req.cookies.jwt) as JwtPayload; 
      if (payload) {
        req.user = { id: payload.userID }; 
        return next();
      }
    }

    // Header based
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]; 
      const payload = UserIdentityService.verify(token) as JwtPayload; 
      console.log(payload)
      if (payload) {
        req.user = { id: payload.userID }; 
        return next();
      }
    }
  }                                   
  return ResponseBuilder.Forbidden(res, "Please Login to access this resource.");
}

export async function checkUserPermissions(userId: string, allowedPermissions: string[]): Promise<boolean> {
  const userRepository = AppDataSource.getRepository(User);
  const numericUserId = parseInt(userId, 10);
  // Tìm người dùng và tải các role và permission liên quan
  const user = await userRepository.findOne({
    where: { id: numericUserId },
    relations: ['roles', 'roles.permissions'],
  });

  // Kiểm tra nếu user hoặc roles không tồn tại
  if (!user || !user.roles) {
    return false;
  }

  // Lấy tất cả các quyền từ các role của người dùng
  const userPermissions = user.roles.flatMap(role => role.permissions.map(permission => permission.name));

  // Kiểm tra xem người dùng có ít nhất một trong các quyền được phép hay không
  return allowedPermissions.some(permission => userPermissions.includes(permission));
}


export function canAccessBy(...allowedPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user || !req.user.id) {
       ResponseBuilder.Unauthorize(res, "You need to login to access this resource.");
       return 
    }

    const hasPermission = await checkUserPermissions(req.user.id, allowedPermissions);
    if (!hasPermission) {
      ResponseBuilder.Forbidden(res, "You are not allowed to access this resource.");
      return 
    }

    next();
  };
}