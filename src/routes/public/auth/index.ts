import { Router } from "express";
import User from "../../../database/models/User"; 
import { AppDataSource } from "../../../database/config"; 

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
   res.send('Login')
});


export default userRouter;
module.exports = userRouter;
