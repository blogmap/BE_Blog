import { AppDataSource } from "../database/config";
import User from "../database/models/User";
import { hash } from "./hasher";
import UserSchema from "../schemas/UserSchema";
import { compare } from "../services/hasher";
import { mailService } from "./mailService";
import UserIdentityService  from "../services/authentication";
import exp from "constants";

const dotenv = require('dotenv');
dotenv.config();
const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (data: any) => {
  const reqBody = UserSchema.UserValidation.parse(data);

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
    throw new Error(message);
  }

  let user = new User();
  user.username = reqBody.username;
  user.password = hash(reqBody.password);
  user.dateOfBirth = new Date(reqBody.dateOfBirth);
  user.fullname = reqBody.fullname;
  user.mail = reqBody.mail;

  await userRepository.save(user);
  return user;
};


export const loginUser = async (data: any) => {
    const reqBody = UserSchema.UserAccountValidation.parse(data);
    console.log(reqBody)
    const user = await userRepository.findOne({ where: { username: reqBody.username } });
    console.log(user)
    if (user && compare(reqBody.password, user.password)) {
        const token = await UserIdentityService.sign(user.id.toString());
        return token;
    } else {
        throw new Error("Invalid username or password");
    }
};

export const forgotPassword_Ser = async (data: {email: string; }) => {
  const mail = data.email;
  const user = await userRepository.findOne({ where: { mail: mail } });
  
  if (!user) {
      return new Error('User not found');
  }

  // Chỉ truyền ID của người dùng để tạo token
  const token = await UserIdentityService.sign(user.id.toString());
  const time = new Date(Date.now() + 10 * 60 * 1000); 

  user.forgetPasswordToken = token; 
  user.forgetPasswordTokenTime = time; 
  console.log(user)
  await userRepository.save(user);

  const resetUrl = `${process.env.BASE_URL_FE}/apis/auth/resetPassword?token=${token}`;
  const mailOptions = {
      emailFrom: process.env.EMAIL_USER || 'Hothanhtienqb@example.com',
      emailTo: mail,
      subject: "Password Reset Request",
html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="text-align: center; color: #072541;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>You have requested to reset your password. Please click the button below to reset your password immediately:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a 
                    href="${resetUrl}" 
                    style="
                        background-color: #5272F2; 
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 4px;
                        display: inline-block;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                    "
                    onmouseover="this.style.backgroundColor='#072541';"
                    onmouseout="this.style.backgroundColor='#5272F2';"
                >
                    Reset Password Now
                </a>
            </div>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The Support Team</p>
            <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px; text-align: center; color: #777;">
                <small>We are glad to work with you</small>
            </div>
        </div>
    </div>
`,

  };

  try {
      await mailService.sendEmail(mailOptions);
      return { message: 'Password reset and email sent successfully' };
  } catch (error) {
      console.error('Failed to send email:', error);
      return { message: 'Failed to send email', error };
  }
}

export const resetPassword_Ser = async (data: { token: string, newPassword: string}) => {
  const { token, newPassword } = data;
    console.log(token, newPassword)
    const user = await userRepository.findOne({ where: { forgetPasswordToken: token } });
    console.log("tets",user)
    if (!user) {
        throw new Error('Invalid or expired token');
    }
    if (!user.forgetPasswordTokenTime) {
    throw new Error('Token has expired 1');
    }

    const currentTime = new Date();
    if (user.forgetPasswordTokenTime < currentTime) {
    throw new Error('Token has expired');
    }

    user.password = hash(newPassword);
    user.forgetPasswordToken = null; 
    user.forgetPasswordTokenTime = null; 
    await userRepository.save(user);

    return { message: 'Password has been reset successfully' };
}