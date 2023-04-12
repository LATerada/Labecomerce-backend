import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const editProductById = async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.image_url as string | undefined;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
      if (newId.length < 4) {
        res.status(400);
        throw new Error("'id' deve possuir pelo menos 4 caracteres");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }
      if (newName.length < 4) {
        res.status(400);
        throw new Error("'name' deve possuir pelo menos 4 caracteres");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser do tipo number");
      }
      if (newPrice < 0) {
        res.status(400);
        throw new Error("'price' deve ser maior ou igual a zero.");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'description' deve ser string");
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'imageUrl' deve ser string");
      }
    }

    const [product]: TProduct[] | undefined[] = await db("products").where({
      id: idToEdit,
    });

    if (!product) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    const newProduct: TProduct = {
      id: newId || product.id,
      name: newName || product.name,
      price: isNaN(newPrice) ? product.price : newPrice,
      description: newDescription || product.description,
      image_url: newImageUrl || product.image_url,
    };

    await db("products").update(newProduct).where({ id: idToEdit });

    res
      .status(200)
      .send({ mensagem: "Produto editadp com sucesso", product: newProduct });
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
