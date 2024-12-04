import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
import { createPost, deletePost, unDownVotePost, unUpVotePost, upDownVotePost, upUpVotePost, getAllPost } from "../post/postController"
import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";
const postRouter = Router();

postRouter.post("/", async (req, res) => {
   res.send("postHome")
});

postRouter.post("/createPost",authenticateJWT, canAccessBy('UpdateUser'),validate(PostSchema.CreatePostValidation), asyncHandler(createPost))
postRouter.post("/deletePost/:id",authenticateJWT, asyncHandler(deletePost))

// vote
postRouter.post("/unDownVotePost/:id", authenticateJWT, asyncHandler(unDownVotePost))
postRouter.post("/unUpVotePost/:id", authenticateJWT, asyncHandler(unUpVotePost))

postRouter.post("/upDownVotePost/:id", authenticateJWT, asyncHandler(upDownVotePost))
postRouter.post("/upUpVotePost/:id", authenticateJWT, asyncHandler(upUpVotePost))

//get all post
postRouter.get("/home", asyncHandler(getAllPost))

export default postRouter;

