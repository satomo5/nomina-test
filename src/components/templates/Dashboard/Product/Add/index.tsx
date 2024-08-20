"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { getRandomInt } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useProducContext } from "@/context/product";

function ProductAdd({ id }: { id?: string }) {
  const router = useRouter();
  const { addData, editData, getDetailData } = useProducContext();
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });
  const product = getDetailData(Number(id));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (id && product) {
      editData(Number(id), { ...product, ...form });
    } else {
      addData({
        id: getRandomInt(1000),
        ...form,
      });
    }

    router.replace("/dashboard/product");
  }

  useEffect(() => {
    if (product) setForm({ ...product });
  }, [product]);

  return (
    <div className="card-wrapper add-form">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
          required
        />
        <Input
          id="username"
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
        />
        <div className="submit">
          <Button type="submit" variant="success">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
