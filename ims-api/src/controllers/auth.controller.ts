import * as bcrypt from "bcrypt";
import { User } from "./../entities/user.entity";
import { Request, Response } from "express";
import {
  sendConfirmationEmail,
  objToString,
  verifyToken,
  generateToken,
  sendPasswordResetEmail,
} from "../utility/user.utils";

import { UserStatus } from "../enums/user.enum";
import { validate } from "class-validator";
import { lowerCase } from "lower-case";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({
      message: "Username or Password is incorrect",
    });
  } else if (user.confirmed === UserStatus.PENDING) {
    const token = await generateToken({
      username: user.username,
      email: user.email,
    });
    await sendConfirmationEmail(user.username, user.email, token);
    res.status(400).json({
      message: "Please confirm your email , check your email",
    });
  } else {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Username or Password is incorrect",
      });
    } else {
      const token = await generateToken({
        id: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      });
      return res.status(200).json({
        message: "Login Successful",
        token,
      });
    }
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;
  const userEmail = await User.findOne({ where: { email } });
  const userPhone = await User.findOne({ where: { phone } });
  if (userEmail) {
    return res.status(400).json({
      message: `User with email ${email} already exist`,
    });
  }
  if (userPhone) {
    return res.status(400).json({
      message: `User with phone ${phone} already exist`,
    });
  }
  try {
    const newUser = new User();
    newUser.username = lowerCase(username);
    newUser.email = lowerCase(email);
    newUser.password = password;
    newUser.phone = phone;

    validate(newUser).then(async (errors) => {
      if (errors.length > 0) {
        const { constraints } = errors[0];
        res.status(422).json({
          message: objToString(constraints),
        });
      } else {
        const token = await generateToken({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          phone: newUser.phone,
        });
        sendConfirmationEmail(newUser.username, newUser.email, token);
        res.status(201).json({
          message: "User created successfully, please check your email",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      err: error,
    });
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;
  const decoded = (await verifyToken(token)) as any;

  if (!decoded) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  const { username, email } = decoded;
  const user = await User.findOne({ where: { username, email } });
  if (!user) {
    try {
      const { password, phone, department } = decoded;
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = password;
      newUser.phone = phone;
      newUser.department = department || null;
      newUser.confirmed = UserStatus.VERIFIED;

      await newUser.save();
      return res.status(200).json({
        message: "User confirmed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "User confirmation failed",
        err: error,
      });
    }
  } else {
    if (user.confirmed === UserStatus.PENDING) {
      user.confirmed = UserStatus.VERIFIED;
      await user.save();
      return res.status(200).json({
        message: "User confirmed successfully",
      });
    }
    return res.status(200).json({
      message: "User already confirmed",
    });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      message: "User with this email does not exist",
    });
  } else {
    try {
      const isMatch = await user.comparePassword(newPassword);
      if (isMatch) {
        return res.status(400).json({
          message: "New password must be different from old password",
        });
      }
      const token = await generateToken({
        username: user.username,
        email: user.email,
        newPassword: newPassword,
      });
      await sendPasswordResetEmail(user.username, user.email, token);
      return res.status(200).json({
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Password reset failed",
        err: error,
      });
    }
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const decoded = (await verifyToken(token)) as any;
  if (!decoded) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  const { username, email, newPassword } = decoded;
  const user = await User.findOne({ where: { username, email } });
  if (!user) {
    return res.status(400).json({
      message: "User with this email does not exist",
    });
  }

  const isMatch = await bcrypt.compare(newPassword, user.password);
  if (isMatch) {
    return res.status(400).json({
      message: "New password cannot be same as old password",
    });
  } else {
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json({
      message: "Password reset successful",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { oldPassword, newPassword } = req.body;

  const decoded = (await verifyToken(token)) as any;
  if (!decoded) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  const { username, email } = decoded;
  const user = await User.findOne({ where: { username, email } });
  if (!user) {
    return res.status(400).json({
      message: "User with this email does not exist",
    });
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return res.status(400).json({
      message: "Old password is incorrect",
    });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.status(200).json({
    message: "Password changed successfully",
  });
};