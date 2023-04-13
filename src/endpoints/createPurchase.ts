import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase, TPurchaseProduct } from "../types";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const buyer = req.body.buyer as string;
    const totalPrice = req.body.totalPrice as number;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 4 caracteres");
    }

    if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("'buyer' deve ser string");
    }
    if (buyer.length < 4) {
      res.status(400);
      throw new Error("'buyer' deve possuir pelo menos 4 caracteres");
    }

    if (typeof totalPrice !== "number") {
      res.status(400);
      throw new Error("'totalPrice' deve ser number");
    }
    if (totalPrice < 0) {
      res.status(400);
      throw new Error("'totalPrice' deve ser maior que 0");
    }

    if (typeof productId !== "string") {
      res.status(400);
      throw new Error("'productId' deve ser string");
    }
    if (productId.length < 4) {
      res.status(400);
      throw new Error("'productId' deve possuir pelo menos 4 caracteres");
    }

    if (typeof quantity !== "number") {
      res.status(400);
      throw new Error("'quantity' deve ser number");
    }
    if (quantity < 0) {
      res.status(400);
      throw new Error("'quantity' deve ser maior que 0");
    }

    const [purchaseIdAlreadyExists]: TPurchase[] | undefined[] = await db(
      "purchases"
    ).where({ id });

    if (!purchaseIdAlreadyExists) {
      const newPurchase: TPurchase = {
        id,
        buyer,
        total_price: totalPrice,
      };
      const newPurchaseProduct: TPurchaseProduct = {
        purchase_id: id,
        product_id: productId,
        quantity,
      };

      await db("purchases").insert(newPurchase);
      await db("purchases_products").insert(newPurchaseProduct);
    } else {
      const newPurchaseProduct: TPurchaseProduct = {
        purchase_id: id,
        product_id: productId,
        quantity,
      };
      await db("purchases_products").insert(newPurchaseProduct);
    }

    res.status(201).send("Pedido realizado com sucesso");
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
