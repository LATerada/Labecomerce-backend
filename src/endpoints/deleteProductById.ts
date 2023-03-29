import { Request, Response } from "express";
import { products } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productExists = products.find((product) => {
      return product.id === id;
    });
    if (!productExists) {
      res.status(404);
      throw new Error("Produtp não encontrado.");
    }

    const productIndex = products.findIndex((product) => {
      return product.id === id;
    });
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
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
