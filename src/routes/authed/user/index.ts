import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
   res.send(req.user)
});


export default userRouter;
module.exports = userRouter;
