import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct, TPurchase, TPurchaseProduct } from "../types";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { id, buyer, products } = req.body;

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

    if (products.length < 0) {
      res.status(400);
      throw new Error("A compra deve ter pelo menos um produto");
    }
    for (let product of products) {
      const [productExists]: TProduct[] | undefined[] = await db(
        "products"
      ).where({ id: product.productId });

      if (!productExists) {
        res.status(404);
        throw new Error(`Produto de 'id' ${product.id} não encontrado`);
      }

      if (typeof product.quantity !== "number") {
        res.status(400);
        throw new Error("'quantity' deve ser number");
      }
      if (product.quantity < 0) {
        res.status(400);
        throw new Error("'quantity' deve ser maior que 0");
      }
    }

    const [purchaseIdAlreadyExists]: TPurchase[] | undefined[] = await db(
      "purchases"
    ).where({ id });

    if (purchaseIdAlreadyExists) {
      res.status(400);
      throw new Error("'id' da compra já existe");
    }

    let purchaseTotalPrice = 0;
    for (let product of products) {
      const [productWithPrice] = await db("products").where({
        id: product.productId,
      });
      purchaseTotalPrice += productWithPrice.price * product.quantity;
    }

    const newPurchase: TPurchase = {
      id,
      buyer,
      total_price: purchaseTotalPrice,
    };
    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const [purchaseProductAlreadyExists]: TPurchaseProduct[] | undefined[] =
        await db("purchases_products")
          .where({ purchase_id: id })
          .andWhere({ product_id: product.productId });

      if (purchaseProductAlreadyExists) {
        const newPurchaseProduct: TPurchaseProduct = {
          ...purchaseProductAlreadyExists,
          quantity: purchaseProductAlreadyExists.quantity + product.quantity,
        };

        await db("purchases_products")
          .update(newPurchaseProduct)
          .where({ purchase_id: id })
          .andWhere({ product_id: product.productId });
      } else {
        const newPurchaseProduct: TPurchaseProduct = {
          purchase_id: id,
          product_id: product.productId,
          quantity: product.quantity,
        };

        await db("purchases_products").insert(newPurchaseProduct);
      }
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
