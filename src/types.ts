export type TUser = {
  id: string,
  email: string,
  password: string,
};
export type TProduct = {
  id: string,
  name: string,
  price: number,
  category: TICKETS_CATEGORY,
};
export type TPurschase = {
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number,
};
export enum TICKETS_CATEGORY {
  MUSEUM = "museum",
  OBSERVATORY = "observatory",
  LIBRARY = "library",
  ZOO = "zoo",
}
