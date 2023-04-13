import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete[0] !== "p") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'p'");
    }
    const [productIdToDelete]: TProduct[] | undefined[] = await db(
      "products"
    ).where({
      id: idToDelete,
    });

    if (!productIdToDelete) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    await db("purchases_products").del().where({ product_id: idToDelete });
    await db("products").del().where({ id: idToDelete });

    res.status(200).send({ message: "Produto deletada com sucesso." });
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
