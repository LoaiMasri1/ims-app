import { Department } from "../entities/department.entity";
import { Request, Response } from "express";

export const createDepartment = async (req: Request, res: Response) => {
  const { name, floor } = req.body;
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
    department.save();
    res.status(201).json({
      message: "Department created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Department creation failed",
      err: error,
    });
  }
};
export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const { name, floor } = req.body;
  const exist = await Department.findOne({ where: { id } });
  if (!exist) {
    return res.status(400).json({
      message: `Department with id ${id} Not Found`,
    });
  }

  const ExistName = await Department.findOne({ where: { name } });
  if (ExistName) {
    return res.status(400).json({
      message: `Department with Name ${name} already exist`,
    });
  }

  try {
    exist.name = name;
    exist.floorNumber = Number(floor);
    exist.save();
    res.status(201).json({
      message: "Department update successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Department update failed",
      err: error,
    });
  }
};
export const removeDepartment = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const exist = await Department.findOne({ where: { id } });
  if (!exist) {
    return res.status(400).json({
      message: `Department with id ${id} Not Found`,
    });
  }
  try {
    await exist.remove();
    res.status(201).json({
      message: "Department delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Department delete failed",
      err: error,
    });
  }
};

export const searchbyFloor = async (req: Request, res: Response) => {
  const { floor } = req.query as any;
  const department = await Department.find({
    where: { floorNumber: Number(floor) },
  });
  if (!department) {
    return res.status(400).json({
      message: `it is ${floor} not found`,
    });
  }
  try {
    res.status(201).json({
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Department search failed",
      err: error,
    });
  }
};

export const searchbyId = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const department = await Department.findOne({ where: { id } });
  if (!department) {
    return res.status(400).json({
      message: `Department with id ${id} Not Found`,
    });
  }
  try {
    res.status(201).json({
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Department search failed",
      err: error,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const department = await Department.find();
  if (!department) {
    return res.status(400).json({
      message: `Department not found`,
    });
  }
  try {
    res.status(201).json({
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Department search failed",
      err: error,
    });
  }
};
