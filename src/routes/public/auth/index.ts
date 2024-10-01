import { Router } from "express";
import User from "../../../database/models/User"; 
import { AppDataSource } from "../../../database/config"; 

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
   res.send("Login")
});


export default authRouter;
module.exports = authRouter;
