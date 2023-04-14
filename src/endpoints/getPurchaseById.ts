import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct, TPurchase, TPurchaseProduct } from "../types";

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({
      id: purchaseId,
    });
    if (!purchase) {
      res.status(404);
      throw new Error("Compra não existe");
    }

    const [result] = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as userName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt",
        "purchases.paid"
      )
      .where({ purchaseId })
      .innerJoin("users", "users.id", "=", "purchases.buyer");

    const purchaseProducts: TPurchaseProduct[] | undefined[] = await db(
      "purchases_products"
    ).where({ purchase_id: purchaseId });

    let products = [];

    for (let product of purchaseProducts) {
      const [productFromPurchase]: TProduct[] = await db("products").where({
        id: product.product_id,
      });
      const newProduct = {
        ...productFromPurchase,
        quantity: product.quantity,
      };
      products.push(newProduct);
    }

    const newResult = {
      ...result,
      products,
    };

    res.status(200).send(newResult);
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
