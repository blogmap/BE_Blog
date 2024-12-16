import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
import { createPost, deletePost, unDownVotePost, unUpVotePost, upDownVotePost, upUpVotePost, getAllPost } from "../post/postController";
import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";
import { PermissionEnum } from "../../common/enums/permissions";
import { uploadToCloudinary, upload } from "../../middlewares/uploadIMG"; // Middleware upload ảnh lên Cloudinary

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  res.send("postHome");
});

postRouter.post(
   "/createPost",
   authenticateJWT, 
   canAccessBy(PermissionEnum.CanCreatePost), 
   upload.single('image'), 
   uploadToCloudinary,
   validate(PostSchema.CreatePostValidation),
   asyncHandler(createPost) 
);
postRouter.post("/deletePost/:id",authenticateJWT, asyncHandler(deletePost))

// vote
postRouter.post("/unDownVotePost/:id", authenticateJWT, asyncHandler(unDownVotePost))
postRouter.post("/unUpVotePost/:id", authenticateJWT, asyncHandler(unUpVotePost))

postRouter.post("/upDownVotePost/:id", authenticateJWT, asyncHandler(upDownVotePost))
postRouter.post("/upUpVotePost/:id", authenticateJWT, asyncHandler(upUpVotePost))

//get all post
postRouter.get("/home", asyncHandler(getAllPost))

export default postRouter;
module.exports = postRouter;
