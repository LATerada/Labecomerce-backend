import { Request, Response } from "express";
// import { products } from "../database";
import { db } from "../database/knex";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // const product = products.find((product) => {
    //   return product.id === id;
    // });
    const [product] = await db("products").where({ id: id });

    if (!product) {
      res.status(404);
      throw new Error("Produto não existe");
    }

    res.status(200).send(product);
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
