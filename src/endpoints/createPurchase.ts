import { Request, Response } from "express";
import { products, purchases, users } from "../database";
import { TPurschase } from "../types";

export const createPurchase = (req: Request, res: Response) => {
  const userId = req.body.useId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;
  const totalPrice = req.body.totalPrice as number;

  if (!userId) {
    res.status(400);
    throw new Error("É necessário incluir um 'userId'");
  }
  if (!productId) {
    res.status(400);
    throw new Error("É necessário incluir um 'productId'");
  }
  if (!quantity) {
    res.status(400);
    throw new Error("É necessário incluir um 'quantity'");
  }
  if (!totalPrice) {
    res.status(400);
    throw new Error("É necessário incluir um 'totalPrice'");
  }

  const userIdExists = users.find((user) => {
    return user.id === userId;
  });
  if (!userIdExists) {
    res.status(404);
    throw new Error("Usuário não encontrado.");
  }

  const productIdExists = products.find((product) => {
    return product.id === userId;
  });
  if (!productIdExists) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }

  if (totalPrice !== productIdExists.price * quantity) {
    res.status(400);
    throw new Error("O Cálculo de 'totalPrice' está incorreto");
  }

  const newPurchase: TPurschase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };
  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso");
};
