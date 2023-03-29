import { Request, Response } from "express";
import { products } from "../database";
import { TICKETS_CATEGORY, TProduct } from "../types";

export const createProduct = (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as TICKETS_CATEGORY;

  if(!id){
    res.status(400)
    throw new Error("É necessário incluir um 'id'")
  }
  if(!name){
    res.status(400)
    throw new Error("É necessário incluir um 'name'")
  }
  if(!price){
    res.status(400)
    throw new Error("É necessário incluir um 'price'")
  }
  if(!category){
    res.status(400)
    throw new Error("É necessário incluir 'category'")
  }

  const idUsed = products.find((product) => {
    return product.id === id;
  });
  if (idUsed) {
    res.status(409);
    throw new Error("'id' já existe.");
  }

  const newProduct: TProduct = {
    id,
    name,
    price,
    category,
  };
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso");
};
