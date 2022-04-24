import { User } from "./../entities/user.entity";
import { Request, Response } from "express";
import {sendConfirmationEmail, objToString} from "../utility/user.utils";
import * as jwt from "jsonwebtoken";
import UserStatus from "../enums/user.enum";
import {validate} from "class-validator"

export const login = async (req: Request, res: Response) => {
  if (req.cookies.token) {
    return res.status(200).json({
      message: "You are already logged in",
    });
  }

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

  if (!user.comparePassword(password)) {
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

  res.cookie("token", token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  });

  res.status(200).json({
    token: token,
  });
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
    const newUser =  new User()
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.phone = phone;
    

    validate(newUser).then(errors => {
      // errors is an array of validation errors
      
      if (errors.length > 0) {
        const {constraints} = errors[0]
        res.status(422).json({
          message: objToString(constraints),
        });
      } else {
        console.log('validation succeed');
        newUser.save();
        sendConfirmationEmail(
      newUser.username,
      newUser.email,
      newUser.confirmationCode
    );
    res.status(201).json({
      message: "User created successfully, please check your email",
    });
  
      }
    });
  }
     catch (error) {
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
      message: "User not found",
    });
  }
  try {
    user.confirmed = UserStatus.VERIFIED;
    user.confirmationCode = "";
    user.save();
    res.status(201).json({
      message: "User confirmed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "User confirmation failed",
      err: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};
