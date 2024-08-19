import { StatusOrderType } from "./status";

export type OrderType = {
  id: number;
  customerName: string;
  status: StatusOrderType;
  products: { name: string; quantity: number; price: number }[];
  email: string;
};
