import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
   res.send("okkk")
});


export default userRouter;
module.exports = userRouter;
