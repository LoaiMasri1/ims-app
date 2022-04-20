import { Request, Response, NextFunction } from "express";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  next();
};
