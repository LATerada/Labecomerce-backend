import { Request, Response } from "express";
import { products } from "../database";
import { TICKETS_CATEGORY, TProduct } from "../types";

export const createProduct = (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as TICKETS_CATEGORY;

    if (!id) {
      res.status(400);
      throw new Error("É necessário incluir um 'id'");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    if (!name) {
      res.status(400);
      throw new Error("É necessário incluir um 'name'");
    }else if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
    }

    if (!price) {
      res.status(400);
      throw new Error("É necessário incluir um 'price'");
    } else if (price) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("'price' deve ser do tipo number");
      }
      if (price < 0) {
        res.status(400);
        throw new Error("'price' deve ser maior ou igual a zero.");
      }
    }

    if (!category) {
      res.status(400);
      throw new Error("É necessário incluir 'category'");
    } else if (category) {
      if (
        category !== TICKETS_CATEGORY.LIBRARY &&
        category !== TICKETS_CATEGORY.MUSEUM &&
        category !== TICKETS_CATEGORY.OBSERVATORY &&
        category !== TICKETS_CATEGORY.ZOO
      ) {
        res.status(400);
        throw new Error("'type' deve ser um dos tipos válidos");
      }
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
