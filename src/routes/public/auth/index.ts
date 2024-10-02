import { Router } from "express";
import User from "../../../database/models/User";
import { AppDataSource } from "../../../database/config";
import UserSchema from "../../../schemas/UserSchema";
import { hash, compare } from "../../../services/hasher";

const authRouter = Router();

const userRepository = AppDataSource.getRepository(User);

authRouter.post("/register", async (req, res) => {
  try {
    const reqBody = UserSchema.UserValidation.parse(req.body);
    console.log(reqBody.dateOfBirth);

    const existingUser = await userRepository.findOne({
      where: [{ username: reqBody.username }, { mail: reqBody.mail }],
    });

    if (existingUser) {
      let message = '';
      if (existingUser.username === reqBody.username && existingUser.mail === reqBody.mail) {
        message = 'Username and email already exist.';
      } else if (existingUser.username === reqBody.username) {
        message = 'Username already exists.';
      } else if (existingUser.mail === reqBody.mail) {
        message = 'Email already exists.';
      }

      return res.status(409).json({ message });
    }

    let user = new User();
    user.username = reqBody.username;
    user.password = hash(reqBody.password);
    user.dateOfBirth = new Date(reqBody.dateOfBirth);
    user.fullname = reqBody.fullname;
    user.mail = reqBody.mail;

    console.log("1", user);

    await userRepository.save(user);
    res.status(200).json(user);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message); 
    } else {
      res.status(500).send('Error'); 
    }
  }
});

export default authRouter;
module.exports = authRouter;
