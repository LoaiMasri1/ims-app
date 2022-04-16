import { Router } from "express";
import {
  createDepartment,
  removeDepartment,
  searchbyFloor,
  searchbyName,
  updateDepartment,
} from "../controllers/department.controller";
export const DepartmentRouter: Router = Router({
  strict: true,
});
DepartmentRouter.get("/search", searchbyName);
DepartmentRouter.get("/", searchbyFloor);
DepartmentRouter.put("/", updateDepartment);
DepartmentRouter.post("/", createDepartment);
DepartmentRouter.delete("/:name", removeDepartment);
