import { Request, Response } from "express";
import { products } from "../database";
import { TICKETS_CATEGORY } from "../types";

export const editProductById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as TICKETS_CATEGORY | undefined;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' inválido. Deve ser do tipo string.");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' inválido. Deve ser do tipo string.");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser do tipo number");
      }
      if (newPrice < 0) {
        res.status(400);
        throw new Error("'price' deve ser maior ou igual a zero.");
      }
    }

    if (newCategory !== undefined) {
      if (
        newCategory !== TICKETS_CATEGORY.LIBRARY &&
        newCategory !== TICKETS_CATEGORY.MUSEUM &&
        newCategory !== TICKETS_CATEGORY.OBSERVATORY &&
        newCategory !== TICKETS_CATEGORY.ZOO
      ) {
        res.status(400);
        throw new Error("'type' deve ser um dos tipos válidos");
      }
    }

    const newIdUsed = products.find((product) => {
      return product.id === newId;
    });
    if (newIdUsed !== undefined) {
      if (newIdUsed) {
        res.status(409);
        throw new Error("O 'id' já existe.");
      }
    }

    const newNameUsed = products.find((product) => {
      return product.name === newName;
    });
    if (newNameUsed) {
      res.status(409);
      throw new Error("O 'name' já existe.");
    }

    const productToEdit = products.find((product) => {
      return product.id === id;
    });

    if (productToEdit) {
      productToEdit.id = newId || productToEdit.id;
      productToEdit.name = newName || productToEdit.name;
      productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice;
      productToEdit.category = newCategory || productToEdit.category;
    } else if (!productToEdit) {
      res.status(404);
      throw new Error("Produto não cadastrado.");
    }

    res.status(200).send("Produto atualizado com sucesso");
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
