import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategoryNotId,
  searchById,
  getSubOfCategory,
  deleteAllCategory,
  getMainOfCategory,
  updateCategory,
} from "../controllers/category.controller";

export const CategoryRouter: Router = Router({
  strict: true,
});

CategoryRouter.post("/", createCategory);
CategoryRouter.put("/", updateCategoryNotId);
CategoryRouter.put("/:id", updateCategory);
CategoryRouter.delete("/:id", deleteCategory);
CategoryRouter.delete("/", deleteAllCategory);
CategoryRouter.get("/", getAllCategory);
CategoryRouter.get("/:id", searchById);
CategoryRouter.get("/subClassification/:sub", getSubOfCategory);
CategoryRouter.get("/mainClassification/:main", getMainOfCategory);
