import { Room } from "../entities/room.entity";
import { Request, Response } from "express";

export const updateRoom = async (req: Request, res: Response) => {
    const {id,type} = req.body;
    const exist = await Room.findOne({ where: { id } });
    if (!exist) {
      return res.status(400).json({
        message: `Room with id ${id} Not Found`,
      });
    }
    const updatedate = exist;
    try {
      updatedate.id=id;
      updatedate.type=type;
      updatedate.save();
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
export const searchRoom = async (req: Request, res: Response) => {
    const {id,type} = req.body;
    const exist = await Room.findOne({ where: { id } });
    if (!exist) {
      return res.status(400).json({
        message: `Room with id ${id} not found`,
      });
    }
    try {
        res.json(type);
        res.status(201).json({
          message: "Room search successfully",
        });
      } catch (error) {
        res.status(500).json({
            message: "Room search failed",
            err: error,
          });
      }
  }
  