import { Request, Response } from "express";
import { purchases } from "../database";

export const getAllPurchases = (req: Request, res: Response) => {
  try {
    res.status(200).send(purchases);
  } catch (error) {
    console.log(error);
  }
};
