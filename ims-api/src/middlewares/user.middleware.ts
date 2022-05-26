import { UserRole } from "./../enums/user.enum";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (user.role == UserRole.ADMIN) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
  }
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (user) {
      next();
    } else {
      return res.status(403).json({
        message: "Please login to perform this action",
      });
    }
  }
};
