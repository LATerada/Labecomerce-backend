import { Request, Response } from "express";
import { products } from "../database";
import { TICKETS_CATEGORY, TProduct } from "../types";

export const createProduct = (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as TICKETS_CATEGORY;

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  };
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso");
};
