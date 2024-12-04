import { Router } from "express";
import validate from '../../middlewares/validate';
import PostSchema from "../../schemas/PostSchema";
import asyncHandler from "../../middlewares/asyncHandle";
import { getRoleOfUser, createRole, createPermission, assignRoleToUser, assignPermissionToRole } from "../role/roleController"
import { authenticateJWT } from "../../middlewares/authenticateJWT";
import { assign } from "nodemailer/lib/shared";
const roleRouter = Router();


//get role of user
roleRouter.get("/user/:id", asyncHandler(getRoleOfUser))

// postRouter.post("/", async (req, res) => {
//    res.send("role")
// });
roleRouter.post("/", asyncHandler(createRole))
roleRouter.post("/permission", asyncHandler(createPermission))

roleRouter.post("/assign", asyncHandler(assignRoleToUser))
roleRouter.post("/assign/permission", asyncHandler(assignPermissionToRole))

export default roleRouter;

