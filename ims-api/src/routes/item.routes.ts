import { Router } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  searchItem,
} from "../controllers/item.controller";
export const ItemRouter: Router = Router({
  strict: true,
});

ItemRouter.post("/", createItem);
ItemRouter.put("/", updateItem);
ItemRouter.delete("/", deleteItem);
ItemRouter.get("/", searchItem);
