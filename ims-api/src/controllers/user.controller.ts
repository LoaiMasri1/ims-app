import { User } from "./../entities/user.entity";
import { Request, Response } from "express";

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
export const SearchById =async (req: Request, res: Response) => {
  const { id  } = req.params as any;
  const user = await User.findOne({ where: { id } });
  if(!user){
    return res.status(400).json({
      message: `user with this id ${id} not found`,
    });
  } try {
    res.status(201).json({
        user
    });
  }catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by id",
      err: error,
    });
  }
};
export const SearchByEmail =async (req: Request, res: Response) => {
  const { email  } = req.params as any;
  const user = await User.findOne({ where: { email  } });
  if(!user){
    return res.status(400).json({
      message: `user with this email ${email} not found`,
    });
  } try {
    res.status(201).json({
        user
    });
  }catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by email",
      err: error,
    });
  }
};
export const SearchByPhone =async (req: Request, res: Response) => {
  const { phone  } = req.params as any;
  const user = await User.findOne({ where: { phone  } });
  if(!user){
    return res.status(400).json({
      message: `user with this phone ${phone} not found`,
    });
  } try {
    res.status(201).json({
        user
    });
  }catch (error) {
    res.status(500).json({
      message: "  Failed to search for user by phone",
      err: error,
    });
  }
};
export const SearchByUsername =async (req: Request, res: Response) => {
  const { username  } = req.params as any;
  const user = await User.find({ where: { username  } });
  if(!user){
    return res.status(400).json({
      message: `user with this username ${username} not found`,
    });
  } try {
    res.status(201).json({
        user
    });
  }catch (error) {
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
  const { username, email,  phone ,id } = req.params as any;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(400).json({
      message: `user with id ${id} not found`,
    });
  }
  try {
    user.username =username ;
    user.email = email;
    user.phone =phone ;
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
export const getAllUser =async (req: Request, res: Response) => {
  const user = await User.find();
  if(!user){
    return res.status(400).json({
      message: `not found any user`,
    });
  } try {
    res.status(201).json({
        user
    });
  }catch (error) {
    res.status(500).json({
      message: "  Failed to search for user",
      err: error,
    });
  }
};