import { Request, Response } from "express";
import { products } from "../database";

export const getProductById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => {
      return product.id === id;
    });

    if (!product) {
      res.status(404);
      throw new Error("Produto não existe");
    }

    res.status(200).send(product);
  } catch (error) {
    res.send(error.message);
  }
};
