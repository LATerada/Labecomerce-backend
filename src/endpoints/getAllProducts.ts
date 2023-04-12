import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // const products = await db.raw(`
    // SELECT * FROM products;
    // `);
    const products = await db("products");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};
