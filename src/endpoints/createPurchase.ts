import { Request, Response } from "express";
import { products, purchases, users } from "../database";
import { TPurschase } from "../types";

export const createPurchase = (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as number;

    if (!userId) {
      res.status(400);
      throw new Error("É necessário incluir um 'userId'");
    } else 
    if (typeof userId !== "string") {
      res.status(400);
      throw new Error("'userId' deve ser do tipo string");
    }

    if (!productId) {
      res.status(400);
      throw new Error("É necessário incluir um 'productId'");
    } else if (typeof productId !== "string") {
      res.status(400);
      throw new Error("'productId' deve ser do tipo string");
    }

    if (!quantity) {
      res.status(400);
      throw new Error("É necessário incluir um 'quantity'");
    } else if (quantity) {
      if (typeof quantity !== "number") {
        res.status(400);
        throw new Error("'quantity' deve ser do tipo number");
      }
      if (quantity < 0) {
        res.status(400);
        throw new Error("'quantity' deve ser maior ou igual a zero.");
      }
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
      return product.id === productId;
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
