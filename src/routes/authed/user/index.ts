import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
   res.send("userHome")
});


export default userRouter;
module.exports = userRouter;
