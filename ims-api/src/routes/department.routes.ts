import { Router } from "express";
import { createDepartment, removeDepartment, searchbyFloor, searchbyName, updateDepartment } from "../controllers/department.controller";
export const departmentRouter: Router = Router({
  strict: true,
});
departmentRouter.get("/search",searchbyName);
departmentRouter.get("/",searchbyFloor);
departmentRouter.put("/",updateDepartment);
departmentRouter.post("/",createDepartment);
departmentRouter.delete("/:name",removeDepartment);