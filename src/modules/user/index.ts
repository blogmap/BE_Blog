import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
// import {  } from "../user/userController"
import { getUser, getProfile } from "../user/userController"

import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";
const userRouter = Router();


userRouter.get("/profile", authenticateJWT, asyncHandler(getProfile))
userRouter.get("/:id",authenticateJWT, asyncHandler(getUser))


export default userRouter;
module.exports = userRouter;
