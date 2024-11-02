import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
import { createPost, deletePost, unDownVotePost, unUpVotePost, upDownVotePost, upUpVotePost } from "../post/postController"
import { authenticateJWT } from "../../middlewares/authenticateJWT";
const postRouter = Router();

postRouter.post("/", async (req, res) => {
   res.send("postHome")
});

postRouter.post("/createPost",authenticateJWT, validate(PostSchema.CreatePostValidation), asyncHandler(createPost))
postRouter.post("/deletePost/:id",authenticateJWT, asyncHandler(deletePost))

postRouter.post("/unDownVotePost/:id", authenticateJWT, asyncHandler(unDownVotePost))
postRouter.post("/unUpVotePost/:id", authenticateJWT, asyncHandler(unUpVotePost))

postRouter.post("/upDownVotePost/:id", authenticateJWT, asyncHandler(upDownVotePost))
postRouter.post("/upUpVotePost/:id", authenticateJWT, asyncHandler(upUpVotePost))

export default postRouter;
module.exports = postRouter;
