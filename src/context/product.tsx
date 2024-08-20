"use client";

import { ProductType } from "@/types/product";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ProductContextType {
  data: ProductType[];
  getDetailData: (id: number) => ProductType | undefined;
  setDeleted: (id: number) => void;
  addData: (data: ProductType) => void;
  editData: (id: number, data: ProductType) => void;
}

const ProducContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    const dataStorage = localStorage.getItem("products");

    if (dataStorage) {
      setData(JSON.parse(dataStorage));
    }
  }, []);

  const getDetailData = (id: number) => {
    return data.find((item) => item.id === id);
  };

  const setDeleted = (id: number) => {
    const newData = data.filter((item) => item.id !== id);

    setData(newData);
    localStorage.setItem("products", JSON.stringify(newData));
  };

  const addData = (props: ProductType) => {
    const newData = [props, ...data];

    setData(newData);
    localStorage.setItem("products", JSON.stringify(newData));
  };

  const editData = (id: number, props: ProductType) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return props;
      }
      return item;
    });

    setData(newData);
    localStorage.setItem("products", JSON.stringify(newData));
  };

  return (
    <ProducContext.Provider
      value={{
        data,
        getDetailData,
        setDeleted,
        addData,
        editData,
      }}
    >
      {children}
    </ProducContext.Provider>
  );
}

export function useProducContext() {
  const context = useContext(ProducContext);
  if (!context) {
    throw new Error("useProducContext must be used within an ProductProvider");
  }
  return context;
}
