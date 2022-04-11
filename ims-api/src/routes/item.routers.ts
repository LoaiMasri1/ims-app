import { Router } from "express";
import { createItem,updateItem,deleteItem,searchItem } from "../controllers/item.controller";
export const ItemRouter: Router = Router({
  strict: true,
});

ItemRouter.post("/", createItem )
ItemRouter.post("/", updateItem )
ItemRouter.delete("/", deleteItem )
ItemRouter.get("/", searchItem )