import { products, purchases, users } from "./database";
import { TProduct, TPurschase, TUser } from "./types";

function printUsersProductsPurchases(
  userL: TUser[],
  productL: TProduct[],
  purchaseL: TPurschase[]
): void {
  if (!userL || !productL || !purchaseL) {
    console.log("Introduza a informaçāo a ser buscada no banco de dados.");
  } else {
    userL.map((user: TUser) => {
      console.log(`
            User:
                id:${user.id}
                email:${user.email}
                password:${user.password}`);
    });
    productL.map((product: TProduct) => {
      console.log(`
            Product:
                id: ${product.id},
                name: ${product.name},
                price: ${product.price},
                category: ${product.category}`);
    });
    purchaseL.map((purchase: TPurschase) => {
      console.log(`
            Purchase:
                userId: ${purchase.userId},
                productId: ${purchase.productId},
                quantity: ${purchase.quantity},
                totalPrice: ${purchase.totalPrice}`);
    });
  }
}
printUsersProductsPurchases(users, products, purchases);