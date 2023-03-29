import { Request, Response } from "express";
import { products } from "../database";
import { TProduct } from "../types";

export const searchProductsByName = (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q.length < 1) {
      res.status(400);
      throw new Error("'q' deve possuir pelo menos um caractere.");
    }

    const result: TProduct[] = products.filter((product) => {
      return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
};
