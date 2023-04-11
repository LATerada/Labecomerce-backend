import { Request, Response } from "express";
// import { products, purchases, users } from "../database";
import { db } from "../database/knex";
import { TPurschase } from "../types";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const purchaseId = req.body.id as string;
    const totalPrice = req.body.totalPrice as number;
    // const paid = req.body.paid as boolean;
    const deliveredAt = req.body.delivered_at as string;
    const userId = req.body.user_id as string;

    if (!purchaseId) {
      res.status(400);
      throw new Error("É necessário incluir um 'purchaseId'");
    } else if (typeof purchaseId !== "string") {
      res.status(400);
      throw new Error("'purchaseId' deve ser do tipo string");
    }

    if (!totalPrice) {
      res.status(400);
      throw new Error("É necessário incluir um 'totalPrice'");
    }

    if (!userId) {
      res.status(400);
      throw new Error("É necessário incluir um 'userId'");
    } else if (typeof userId !== "string") {
      res.status(400);
      throw new Error("'userId' deve ser do tipo string");
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

    const userIdExists = await db.raw(`
    SELECT * FROM users
    WHERE id LIKE ${userId}};
    `);
 
    if (!userIdExists) {
      res.status(404);
      throw new Error("Usuário não encontrado.");
    }

    const productIdExists = await db.raw(`
    SELECT * FROM users
    WHERE id LIKE ${productId}};
    `);

    if (!productIdExists) {
      res.status(404);
      throw new Error("Produto não encontrado.");
    }

    if (totalPrice !== productIdExists.price * quantity) {
      res.status(400);
      throw new Error("O Cálculo de 'totalPrice' está incorreto");
    }

    const newPurchase: TPurschase = {
      productId,
      purchaseId,
      totalPrice,
      userId,
    };

    await db.raw(`
    INSERT INTO purchases (productId, purchaseId, totalPrice, userId)
      VALUES ("${newPurchase.productId}","${newPurchase.purchaseId}","${newPurchase.totalPrice}","${newPurchase.userId}",)
    `);
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
