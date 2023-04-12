import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurschase } from "../types";

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [purchase]: TPurschase[] | undefined[] = await db("purchases").where({
      id,
    });

    if (!purchase) {
      res.status(404);
      throw new Error("Compra não existe");
    }
    res.status(200).send(purchase);
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
