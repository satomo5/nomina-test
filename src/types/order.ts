import { StatusOrderType } from "./status";
import { UserType } from "./user";

export type OrderType = {
  id: number;
  customer: UserType | null;
  status: StatusOrderType;
  products: { id: number; name: string; quantity: number; price: number }[];
  total: number;
};
