import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.raw(`
    SELECT * FROM products;
    `);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};
