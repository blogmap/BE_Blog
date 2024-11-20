import { Router } from "express";
import User from "../../database/models/User";
import { AppDataSource } from "../../database/config";
import UserSchema from "../../schemas/UserSchema";
import { hash, compare } from "../../services/hasher";
import { createComment, updateComment, deleteComment } from "./commentController";
import validate from '../../middlewares/validate';
import asyncHandler from '../../middlewares/asyncHandle'
import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";

const commentRouter = Router();

const userRepository = AppDataSource.getRepository(User);

commentRouter.post("/createComment/:id",authenticateJWT, asyncHandler(createComment))
commentRouter.post("/updateComment/:id",authenticateJWT, asyncHandler(updateComment))
commentRouter.post("/deleteComment/:id", authenticateJWT, asyncHandler(deleteComment))

export default commentRouter;
module.exports = commentRouter;
