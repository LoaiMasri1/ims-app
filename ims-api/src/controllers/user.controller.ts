import { User } from "./../entities/user.entity";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import UserStatus from "../enums/user.enum";
import sendConfirmationEmail from "../utility/user.utils";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;
  const exist = await User.findOne({ where: { email } });
  if (exist) {
    return res.status(400).json({
      message: `User with email ${email} already exist`,
    });
  }
  try {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.phone = phone;
    await user.save();
    const confirmationCode = user.confirmationCode;
    sendConfirmationEmail(username, email, confirmationCode);
    res.status(201).json({
      message: "User created successfully, please check your email",
    });
  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      err: error,
    });
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  const { confirmationCode } = req.params;
  const user = await User.findOne({ where: { confirmationCode } });
  if (!user) {
    return res.status(400).json({
      message: "Invalid confirmation code",
    });
  }
  user.confirmed = UserStatus.VERIFIED;
  user.confirmationCode = "";
  await user.save();
  res.status(200).json({
    message: "User confirmed successfully",
  });
};
