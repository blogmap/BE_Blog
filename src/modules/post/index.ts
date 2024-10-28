import { Router } from "express";

const postRouter = Router();

postRouter.post("/", async (req, res) => {
   res.send("postHome")
});


export default postRouter;
module.exports = postRouter;
