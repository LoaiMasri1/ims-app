import { User } from "./../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import sendConfirmationEmail from "../utility/user.utils";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      message: "Email or Password is incorrect",
    });
  }
  if (!user.confirmed) {
    sendConfirmationEmail(user.username, user.email, user.confirmationCode);
    return res.status(400).json({
      message: "User not confirmed , please check your email",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Email or Password is incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
    "secret",
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({
    token: token,
  });
};
