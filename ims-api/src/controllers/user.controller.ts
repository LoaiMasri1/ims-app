import { UserPassword } from "./../enums/user.enum";
import { User } from "./../entities/user.entity";
import { Request, Response } from "express";
import { Department } from "../entities/department.entity";
import { validate } from "class-validator";
import { objToString, sendConfirmationEmail } from "../utility/user.utils";
import { lowerCase } from "lower-case";

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

export const SearchById = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const user = await User.findOne({
    select: ["id", "username", "email", "phone"],
    where: { id },
    relations: { department: true },
    loadRelationIds: true,
  });
  if (!user) {
    return res.status(400).json({
      message: `user with this id ${id} not found`,
    });
  }
  try {
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by id",
      err: error,
    });
  }
};

export const SearchByEmail = async (req: Request, res: Response) => {
  const { email } = req.params as any;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      message: `user with this email ${email} not found`,
    });
  }
  try {
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by email",
      err: error,
    });
  }
};

export const SearchByPhone = async (req: Request, res: Response) => {
  const { phone } = req.params as any;
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    return res.status(400).json({
      message: `user with this phone ${phone} not found`,
    });
  }
  try {
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by phone",
      err: error,
    });
  }
};

export const SearchByUsername = async (req: Request, res: Response) => {
  const { username } = req.params as any;
  const user = await User.find({ where: { username } });
  if (!user) {
    return res.status(400).json({
      message: `user with this username ${username} not found`,
    });
  }
  try {
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by username",
      err: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(400).json({
      message: `user with id ${id} not found`,
    });
  }
  try {
    user.remove();
    res.status(201).json({
      message: "user delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "user delete failed",
      err: error,
    });
  }
};

export const Updateuser = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const { username, email, phone, departmentId } = req.body;
  const department = await Department.findOne({ where: { id: departmentId } });
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(400).json({
      message: `user with id ${id} not found`,
    });
  }
  if (!department) {
    return res.status(400).json({
      message: `department with id ${departmentId} not found`,
    });
  }
  try {
    user.username = username;
    user.email = email;
    user.phone = phone;
    user.department = department;
    await user.save();
    res.status(201).json({
      message: "user update successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "user update failed",
      err: error,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  const user = await User.find({
    select: ["id", "username", "email", "phone"],
    relations: { department: true },
    loadRelationIds: true,
  });
  if (!user) {
    return res.status(400).json({
      message: `not found any user`,
    });
  }
  try {
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for user",
      err: error,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, phone, departmentId } = req.body;
  const userEmail = await User.findOne({ where: { email } });
  const userPhone = await User.findOne({ where: { phone } });
  const department = await Department.findOne({ where: { id: departmentId } });
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
  if (!department) {
    return res.status(400).json({
      message: `department with id ${departmentId} not found`,
    });
  }
  try {
    const newUser = new User();
    newUser.username = lowerCase(username);
    newUser.email = lowerCase(email);
    newUser.password = UserPassword.default;
    newUser.phone = phone;
    newUser.department = department;
    sendConfirmationEmail(
      newUser.username,
      newUser.email,
      newUser.confirmationCode
    );

    validate(newUser).then(async (errors) => {
      if (errors.length > 0) {
        const { constraints } = errors[0];
        res.status(422).json({
          message: objToString(constraints),
        });
      } else {
        await newUser.save();
        res.status(201).json({
          message: "User created successfully",
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
