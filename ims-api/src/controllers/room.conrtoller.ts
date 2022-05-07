import { Room } from "../entities/room.entity";
import { User } from "./../entities/user.entity";
import { Department } from "../entities/department.entity";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
    const {type,departmentId,userId} = req.body;
    const department = await Department.findOne({ where:{id:departmentId} });
    if (!department) {
      return res.status(400).json({
        message: `Department with id ${departmentId} Not Found`,
      });
    }
    const user = await User.findOne({ where:{id:userId} });
    if (!user) {
      return res.status(400).json({
        message: `User with id ${userId} Not Found`,
      });
    }
    try {
      const room = new Room();
      room.type=type;
      room.department=department;
      room.user=user;
      await room.save();
        res.status(201).json({
          message: "Room create successfully",
        });
      } catch (error:any) {
        res.status(500).json({
          message: "Room already exists or failed to create room",
          err: error.driverError.code,
          });
      }
}
export const updateRoom = async (req: Request, res: Response) => {
    const {id}=req.params as any;
    const {type,departmentId,userId} = req.body;
    const room = await Room.findOne({ where:{id} });
    if (!room) {
      return res.status(400).json({
        message: `Room with id ${id} Not Found`,
      });
    }
    const department = await Department.findOne({ where:{id:departmentId} });
    if (!department) {
      return res.status(400).json({
        message: `Department with id ${departmentId} Not Found`,
      });
    }
    const user = await User.findOne({ where:{id:userId} });
    if (!user) {
      return res.status(400).json({
        message: `User with id ${userId} Not Found`,
      });
    }
    try {
      room.type=type;
      room.department=department;
      room.user=user;
      room.save();
        res.status(201).json({
          message: "Room update successfully",
        });
      } catch (error) {
        res.status(500).json({
            message: "Room update failed",
            err: error,
          });
      }
}
export const searchbyType = async (req: Request, res: Response) => {
    const {type} = req.params;
    const room = await Room.find({ where: { type } });
    if (!room) {
      return res.status(400).json({
        message: `it is ${type} not found`,
      });
    }
    try {
        res.status(201).json({
          room
        });
      } catch (error) {
        res.status(500).json({
            message: "Room search failed",
            err: error,
          });
      }
  }
  export const searchbyId = async (req: Request, res: Response) => {
    const {id} = req.params as any;
    try {
      const room = await Room.findOne({ where: { id }, relations:{user:true , department:true},loadRelationIds:true});
      if (!room) {
      return res.status(400).json({
        message: `Room with id ${id} not found`,
      });
    }
        res.status(201).json({ 
          room
        });
      } catch (error) {
        res.status(500).json({
            message: "Room search failed",
            err: error,
          });
      }
  }

  export const getAllRoom = async (req: Request, res: Response) => {
    const room = await Room.find({relations:{user:true , department:true},loadRelationIds:true});
    if (!room) {
      return res.status(400).json({
        message: `Room not found`,
      });
    }
    try {
        res.status(201).json({
          room
        });
      } catch (error) {
        res.status(500).json({
            message: "Room search failed",
            err: error,
          });
      }
  }
 
  export const updateRoombyemployee = async (req: Request, res: Response) => {
    const {id,userId}=req.params as any;
    const room = await Room.findOne({ where:{id} });
    if (!room) {
      return res.status(400).json({
        message: `Room with id ${id} Not Found`,
      });
    }
    const user = await User.findOne({ where:{id:userId} });
    if (!user) {
      return res.status(400).json({
        message: `User with id ${userId} Not Found`,
      });
    }
    try {
      room.user=user;
      room.save();
        res.status(201).json({
          message: "Room update successfully",
        });
      } catch (error) {
        res.status(500).json({
            message: "Room update failed",
            err: error,
          });
      }
}

export const DeleteRoombyemployee = async (req: Request, res: Response) => {
  const {id}=req.params as any;
  const room = await Room.findOne({ where:{id} }) as any;
  if (!room) {
    return res.status(400).json({
      message: `Room with id ${id} Not Found`,
    });
  }
  try {
    room.user=null;
    room.save();
      res.status(201).json({
        message: "user remove successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "user remove failed",
          err: error,
        });
    }
}

export const updateRoombydepartment = async (req: Request, res: Response) => {
  const {id,departmentId}=req.params as any;
  const room = await Room.findOne({ where:{id} });
  if (!room) {
    return res.status(400).json({
      message: `Room with id ${id} Not Found`,
    });
  }
  const department = await Department.findOne({ where:{id:departmentId} });
  if (!department) {
    return res.status(400).json({
      message: `User with id ${departmentId} Not Found`,
    });
  }
  try {
    room.department=department;
    room.save();
      res.status(201).json({
        message: "Room update successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "Room update failed",
          err: error,
        });
    }
}

export const DeleteRoombydepartment = async (req: Request, res: Response) => {
  const {id}=req.params as any;
  const room = await Room.findOne({ where:{id} }) as any;
  if (!room) {
    return res.status(400).json({
      message: `Room with id ${id} Not Found`,
    });
  }
  try {
    room.department=null;
    room.save();
      res.status(201).json({
        message: "department remove successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "department remove failed",
          err: error,
        });
    }
}


export const DeleteRoom = async (req: Request, res: Response) => {
  const {id}=req.params as any;
  const room = await Room.findOne({ where:{id} }) as any;
  if (!room) {
    return res.status(400).json({
      message: `Room with id ${id} Not Found`,
    });
  }
  try {
    room.remove();
      res.status(201).json({
        message: "Room remove successfully",
      });
    } catch (error) {
      res.status(500).json({
          message: "Room remove failed",
          err: error,
        });
    }
}
  