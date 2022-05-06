import { Router } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  searchItem,
  SearchItemById,
  deleteItembyid,
  getAllItem,updateCategorybyItem
} from "../controllers/item.controller";
export const ItemRouter: Router = Router({
  strict: true,
});
ItemRouter.post("/", createItem);
ItemRouter.put("/:name", updateItem);
ItemRouter.delete("/", deleteItem);
//ItemRouter.get("/:name", searchItem);
ItemRouter.get("/:id", SearchItemById);
ItemRouter.delete("/:id", deleteItembyid);
ItemRouter.get("/", getAllItem);
//ItemRouter.get("/:id/category/categoryId",updateCategorybyItem);





