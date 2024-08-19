import { StatusUserType } from "./status";

export type RoleType = "admin" | "manager" | "viewer" | "moderator" | "user";

export type UserType = {
  id: number;
  username: string;
  role: RoleType;
  image: string;
  status: StatusUserType;
};
