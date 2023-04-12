import express from "express";
import cors from "cors";
import { test } from "./endpoints/test";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { createUsers } from "./endpoints/createUsers";
import { searchProductsByName } from "./endpoints/searchProductByName";
import { createProduct } from "./endpoints/createProduct";
import { createPurchase } from "./endpoints/createPurchase";
import { getProductById } from "./endpoints/getProductById";
import { getAllProductsByQuery } from "./endpoints/getAllProductsByQuery";
// import { getUserPurchaseByUserId } from "./endpoints/getUserPurchaseByUserId";
// import { deleteUserById } from "./endpoints/deleteUserById";
// import { deleteProductById } from "./endpoints/deleteProductById";
// import { editUserById } from "./endpoints/editUserById";
import { editProductById } from "./endpoints/editProductById";
import { deletePurchaseById } from "./endpoints/deletePurchaseById";
// import { getAllPurchases } from "./endpoints/getAllPurhcases";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//test
app.get("/ping", test);

//getAllUsers
app.get("/users", getAllUsers);

// getAllProductsByQuery
app.get("/products", getAllProductsByQuery);

// getAllProducts
app.get("/products", getAllProducts);

// //getAllPurchases
// app.get("/purchases", getAllPurchases);

// searchProductByName
app.get("/products/search", searchProductsByName);

// createUser
app.post("/users", createUsers);

// createProduct
app.post("/products", createProduct);

// createPurchase
app.post("/purchases", createPurchase);

// getProductById
app.get("/products/:id", getProductById);

// // getUserPurchaseByUserId
// app.get("/purchases/:id", getUserPurchaseByUserId);

// // deleteUserById
// app.delete("/users/:id", deleteUserById);

// // deleteProductById
// app.delete("/products/:id", deleteProductById);

// // editUserById
// app.put("/users/:id", editUserById);

// editProductById
app.put("/products/:id", editProductById);

// // deletePurchaseById
app.delete("/purchases/:id", deletePurchaseById);
