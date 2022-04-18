import { User } from "./../entities/user.entity";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({
      message: `User with Name ${username} Not Found`,
    });
  }
  try {
    user.username = username;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.save();
    res.status(201).json({
      message: "User update successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "User update failed",
      err: error,
    });
  }
};

export const searchbyName = async (req: Request, res: Response) => {
  const { username } = req.params;
  const exist = await User.findOne({
    where: { username },
    select: ["username", "email", "phone"],
  });
  if (!exist) {
    return res.status(400).json({
      message: `User with Name ${username} Not Found`,
    });
  }
  try {
    res.status(201).json({
      exist,
    });
  } catch (error) {
    res.status(500).json({
      message: "User update failed",
      err: error,
    });
  }
};

export const deleteUserbyEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const exist = await User.findOne({ where: { email } });
  if (!exist) {
    return res.status(400).json({
      message: `this email ${email} Not Found`,
    });
  }
  try {
    exist.remove();
    res.status(201).json({
      message: "User delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "User delete failed",
      err: error,
    });
  }
};
