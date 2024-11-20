import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
// import {  } from "../user/userController"
import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";
const postRouter = Router();

postRouter.post("/", async (req, res) => {
   res.send("postHome")
});

// postRouter.post("/createPost", asyncHandler(getAllUser))


export default postRouter;
module.exports = postRouter;
