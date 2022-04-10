
import { Router } from "express";
import { createitem } from "../controllers/item.controller";
export const itemRouter: Router = Router({
  strict: true,
});

itemRouter.get("/",createitem);
itemRouter.post("/");
