import { Request, Response } from "express";
import { db } from "../database/knex";

export const deletePurchaseById = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete[0] !== "p" && idToDelete[1] !== "r") {
      res.status(400);
      throw new Error("'id' deve iniciar com as letras 'pr'");
    }

    const [purchaseToDelete] = await db("purchases").where({ id: idToDelete });

    if (!purchaseToDelete) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    await db("purchases_products ").del().where({ purchase_id: idToDelete });
    await db("purchases").del().where({ id: idToDelete });

    res.status(200).send("Pedido cancelado com sucesso");
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
