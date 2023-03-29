import { Request, Response } from "express";
import { products } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};
