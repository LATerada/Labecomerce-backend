import express from "express";
import cors from "cors";
import { test } from "./endpoints/test";
import { createUsers } from "./endpoints/createUsers";
import { createProduct } from "./endpoints/createProduct";
import { createPurchase } from "./endpoints/createPurchase";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getPurchaseById } from "./endpoints/getPurchaseById";
import { editProductById } from "./endpoints/editProductById";
import { deletePurchaseById } from "./endpoints/deletePurchaseById";
import { deleteProductById } from "./endpoints/deleteProductById";
// import { getProductsByName } from "./endpoints/searchProductByName";
// import { getProductById } from "./endpoints/getProductById";
// import { getUserPurchaseByUserId } from "./endpoints/getUserPurchaseByUserId";
// import { deleteUserById } from "./endpoints/deleteUserById";

// import { editUserById } from "./endpoints/editUserById";
// import { getAllPurchases } from "./endpoints/getAllPurhcases";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//test
app.get("/ping", test);

// createUser
app.post("/users", createUsers);

// createProduct
app.post("/products", createProduct);

// createPurchase
app.post("/purchases", createPurchase);

//getAllUsers
app.get("/users", getAllUsers);

// getAllProducts
app.get("/products", getAllProducts);

// getPurchaseById
app.get("/purchases/:id", getPurchaseById);

// editProductById
app.put("/products/:id", editProductById);

// deleteProductById
app.delete("/products/:id", deleteProductById);

// // deletePurchaseById
app.delete("/purchases/:id", deletePurchaseById);

// //getAllPurchases
// app.get("/purchases", getAllPurchases);

// // getProductByName
// app.get("/products/search", getProductsByName);

// // getProductById
// app.get("/products/:id", getProductById);

// // getUserPurchaseByUserId
// app.get("/purchases/:id", getUserPurchaseByUserId);

// // deleteUserById
// app.delete("/users/:id", deleteUserById);

// // editUserById
// app.put("/users/:id", editUserById);
