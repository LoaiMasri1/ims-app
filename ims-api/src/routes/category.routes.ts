import { Router } from "express";
import { createCategory, deleteCategory, searchbyId, updateCategory } from "../controllers/category.controller";
export const CategoryRouter: Router = Router({
  strict: true,
});


CategoryRouter.post("/", createCategory )
CategoryRouter.post("/", updateCategory )
CategoryRouter.delete("/", deleteCategory )
CategoryRouter.get("/", searchbyId )