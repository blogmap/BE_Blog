import { Router } from "express";
import User from "../../../database/models/User";
import { AppDataSource } from "../../../database/config";
import UserSchema from "../../../schemas/UserSchema";
import { hash, compare } from "../../../services/hasher";
import { register, login, forgotPassword, resetPassword } from "../../../controllers/authController";

const authRouter = Router();

const userRepository = AppDataSource.getRepository(User);


authRouter.post("/register", register)

authRouter.post("/login", login)

authRouter.post("/forgot-password", forgotPassword)

authRouter.post("/reset-password", resetPassword)
export default authRouter;
module.exports = authRouter;
