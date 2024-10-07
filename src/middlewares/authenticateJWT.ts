import { NextFunction, Request, Response } from "express";
import UserIdentityService from "../services/authentication";
import ResponseBuilder from "../services/responseBuilder";

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
