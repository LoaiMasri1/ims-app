import { Room } from "../entities/room.entity";
import { Request, Response } from "express";

export const updateRoom = async (req: Request, res: Response) => {
    const {id,type} = req.body;
    const exist = await Room.findOne({ where:{id} });
    if (!exist) {
      return res.status(400).json({
        message: `Room with id ${id} Not Found`,
      });
    }
    try {
      exist.type=type;
      exist.save();
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
    const {type} = req.query as any;
    const room = await Room.findOne({ where: { type } });
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
    const {id} = req.query as any;
    const room = await Room.findOne({ where: { id } });
    if (!room) {
      return res.status(400).json({
        message: `Room with id ${id} not found`,
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
  