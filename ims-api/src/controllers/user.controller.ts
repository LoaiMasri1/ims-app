import { UserService } from "./../services/user.service";
import { NextFunction, Request, Response } from "express";
export class UserController {
  static _userService: UserService;

  constructor(private userService: UserService) {
    UserController._userService = userService;
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this._userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
