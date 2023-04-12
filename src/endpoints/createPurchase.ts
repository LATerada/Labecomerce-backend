import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct, TPurschase } from "../types";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { id, buyer, totalPrice } = req.body;

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

    const [purchaseIdAlreadyExists]: TProduct[] | undefined[] = await db(
      "products"
    ).where({ id });

    if (purchaseIdAlreadyExists) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const newPurchase: TPurschase = {
      id,
      buyer,
      total_price: totalPrice,
    };

    await db("purchases").insert(newPurchase);

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
