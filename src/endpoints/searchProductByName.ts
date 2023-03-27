import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const searchProductsByName = (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result: TProduct[] = products.filter((product) => {
    return product.name.toLowerCase().includes(q.toLowerCase());
  });
  res.status(200).send(result);
};
