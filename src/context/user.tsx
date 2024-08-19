"use client";

import { basicFetcher } from "@/lib/fetcher";
import { StatusUserType } from "@/types/status";
import { RoleType, UserType } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

interface UserContextType {
  data: UserType[];
  isLoading: boolean;
  getDetailData: (id: number) => UserType | undefined;
  getFilterData: (data: {
    role: RoleType | "all";
    status: StatusUserType | "all";
  }) => UserType[];
  setStatus: (id: number, status: StatusUserType) => void;
  setDeleted: (id: number) => void;
  addData: (data: UserType) => void;
  editData: (id: number, data: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserType[]>([]);
  const {
    data: resData,
    isLoading,
  }: { data: { users: UserType[] }; isLoading: boolean } = useSWR(
    "https://dummyjson.com/users",
    basicFetcher
  );

  useEffect(() => {
    const dataStorage = localStorage.getItem("users");

    if (!isLoading) {
      if (dataStorage) {
        setData(JSON.parse(dataStorage));
      } else {
        // populate data
        const arr =
          (resData?.users?.map((item) => ({
            ...item,
            role:
              item.role === "moderator"
                ? "manager"
                : item.role === "user"
                ? "viewer"
                : "admin",
            status: "active",
          })) as UserType[]) || [];

        setData(arr);
        localStorage.setItem("users", JSON.stringify(arr));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resData, isLoading]);

  const getDetailData = (id: number) => {
    return data.find((item) => item.id === id);
  };

  const getFilterData = ({
    status,
    role,
  }: {
    status: StatusUserType | "all";
    role: RoleType | "all";
  }) => {
    return data.filter((item) => {
      if (status === "all" && role === "all") {
        return true;
      } else if (status === "all") {
        return item.role === role;
      } else if (role === "all") {
        return item.status === status;
      } else {
        return item.status === status && item.role === role;
      }
    });
  };

  const setStatus = (id: number, status: StatusUserType) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });

    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const setDeleted = (id: number) => {
    const newData = data.filter((item) => item.id !== id);

    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const addData = (props: UserType) => {
    const newData = [props, ...data];

    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const editData = (id: number, props: UserType) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return props;
      }
      return item;
    });

    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  return (
    <UserContext.Provider
      value={{
        data,
        getDetailData,
        getFilterData,
        setStatus,
        setDeleted,
        addData,
        editData,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
}
