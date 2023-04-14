import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 4 caracteres");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser string");
    }
    if (name.length < 4) {
      res.status(400);
      throw new Error("'name' deve possuir pelo menos 4 caracteres");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser string");
    }
    if (price < 0) {
      res.status(400);
      throw new Error("'price' deve ser maior que 0");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser string");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' deve ser string");
    }

    const [userIdAlreadyExists]: TProduct[] = await db("products").where({
      id,
    });
    if (userIdAlreadyExists) {
      res.status(409);
      throw new Error("'id' já existe.");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      image_url: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
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
