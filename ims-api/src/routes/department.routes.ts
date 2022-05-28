import { Router } from "express";
import {
  createDepartment,
  removeDepartment,
  searchbyFloor,
  searchbyId,
  updateDepartment,
  getAll,
} from "../controllers/department.controller";
export const DepartmentRouter: Router = Router({
  strict: true,
});
DepartmentRouter.get("/:id", searchbyId);
DepartmentRouter.put("/:id", updateDepartment);
DepartmentRouter.post("/", createDepartment);
DepartmentRouter.get("/", getAll);
DepartmentRouter.delete("/:id", removeDepartment);
