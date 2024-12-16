import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
import { createPost, deletePost, unDownVotePost, unUpVotePost, upDownVotePost, upUpVotePost, getAllPost } from "../post/postController";
import { authenticateJWT, canAccessBy } from "../../middlewares/authenticateJWT";
import { PermissionEnum } from "../../common/enums/permissions";
import { uploadToCloudinary, upload } from "../../middlewares/uploadIMG"; // Middleware upload ảnh lên Cloudinary

const postRouter = Router();

// Định nghĩa route cho trang chủ post
postRouter.get("/", async (req, res) => {
  res.send("postHome");
});

// Route tạo bài viết mới
postRouter.post(
   "/createPost",
   authenticateJWT, // Middleware xác thực JWT
   canAccessBy(PermissionEnum.CanCreatePost), // Middleware kiểm tra quyền tạo bài viết
   upload.single('image'), // Sử dụng middleware upload để xử lý ảnh
   uploadToCloudinary, // Middleware tải ảnh lên Cloudinary
   validate(PostSchema.CreatePostValidation), // Middleware validate dữ liệu đầu vào
   asyncHandler(createPost) // Handler tạo bài viết, xử lý bất đồng bộ
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
