import { Router } from "express";
import { createDepartment, removeDepartment, searchDepartment, updateDepartment } from "../controllers/department.controller";
export const departmentRouter: Router = Router({
  strict: true,
});
departmentRouter.get("/",searchDepartment);
//departmentRouter.post("/",updateDepartment);
//departmentRouter.post("/",createDepartment);
//departmentRouter.delete("/",removeDepartment);