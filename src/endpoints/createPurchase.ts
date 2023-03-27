import { Request, Response } from "express";
import { purchases } from "../database";
import { TPurschase } from "../types";

export const createPurchase = (req: Request, res: Response) => {
  const userId = req.body.useId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;
  const totalPrice = req.body.totalPrice as number;

  const newPurchase: TPurschase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };
  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso");
};
