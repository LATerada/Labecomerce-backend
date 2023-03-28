import { Request, Response } from "express";
import { products } from "../database";
import { TICKETS_CATEGORY } from "../types";

export const editProductById = (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as TICKETS_CATEGORY | undefined;

  const productToEdit = products.find((product) => {
    return product.id === id;
  });

  if (productToEdit) {
    productToEdit.id = newId || productToEdit.id;
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice;
    productToEdit.category = newCategory || productToEdit.category;
  }
  res.status(200).send("Produto atualizado com sucesso");
};