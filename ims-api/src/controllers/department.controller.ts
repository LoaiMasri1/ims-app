import { Department } from "../entities/department.entity";
import { Request, Response } from "express";


export const createDepartment = async (req: Request, res: Response) => {
    const {name, floor} = req.body;
    const exist = await Department.findOne({ where: { name } });
    if (exist) {
      return res.status(400).json({
        message: `Department with Name ${name} already exist`,
      });
    }
    try {
        const department = new Department();
        department.name = name;
        department.floorNumber = floor;
        department.save()
        res.status(201).json({
          message: "Department created successfully",
        });
      } catch (error) {
        res.status(500).json({
            message: "Department creation failed",
            err: error,
          });
      }
}
export const updateDepartment = async (req: Request, res: Response) => {
  const {name, floor} = req.body;
  const exist = await Department.findOne({ where: { name } });
  if (!exist) {
    return res.status(400).json({
      message: `Department with Name ${name} Not Found`,
    });
  }
  const updatedate = exist;
  try {
    updatedate.name=name;
    updatedate.floorNumber=floor;
    updatedate.save();
      res.status(201).json({
        message: "Department update successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "Department update failed",
          err: error,
        });
    }
}
export const removeDepartment = async (req: Request, res: Response) => {
  const {name, floor} = req.body;
  const exist = await Department.findOne({ where: { name } });
  if (!exist) {
    return res.status(400).json({
      message: `Department with Name ${name} Not Found`,
    });
  }
  try {
    await exist.remove()
    //await exist.save()
      res.status(201).json({
        message: "Department delete successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "Department delete failed",
          err: error,
        });
    }
}
export const searchDepartment = async (req: Request, res: Response) => {
  const {name, floor} = req.body;
  const exist = await Department.findOne({ where: { name } });
  if (!exist) {
    return res.status(400).json({
      message: `Department with Name ${name} not found`,
    });
  }
  try {
      res.json(floor);
      res.status(201).json({
        message: "Department search successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "Department search failed",
          err: error,
        });
    }
}
