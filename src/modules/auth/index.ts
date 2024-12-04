import { Router } from "express";
import User from "../../database/models/User";
import { AppDataSource } from "../../database/config";
import UserSchema from "../../schemas/UserSchema";
import { hash, compare } from "../../services/hasher";
import { register, login, forgotPassword, resetPassword } from "./authController";
import validate from '../../middlewares/validate';
import asyncHandler from '../../middlewares/asyncHandle'
const authRouter = Router();

const userRepository = AppDataSource.getRepository(User);

authRouter.post("/register", validate(UserSchema.UserValidation), asyncHandler(register))

authRouter.post("/login", validate(UserSchema.UserAccountValidation), asyncHandler(login))

authRouter.post("/forgot-password", forgotPassword)

authRouter.post("/reset-password", resetPassword)

export default authRouter;

