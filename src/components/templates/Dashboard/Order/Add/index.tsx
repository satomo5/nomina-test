"use client";

import React, { useState } from "react";
import "./style.scss";
import { StatusOrderType } from "@/types/status";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { statusOrderFilter } from "@/const/filter";
import Button from "@/components/atoms/Button";

function OrderAdd() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<StatusOrderType>("pending");
  const [products, setProducts] = useState<
    {
      name: string;
      quantity: number | undefined;
      price: number | undefined;
    }[]
  >([{ name: "", quantity: undefined, price: undefined }]);

  function handleAddProduct() {
    setProducts([
      ...products,
      { name: "", quantity: undefined, price: undefined },
    ]);
  }

  function handleProductChange(
    index: number,
    field: string,
    value: string | number
  ) {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // const newOrder = { customerName, email, status, products };
  }

  return (
    <div className="card-wrapper add-order">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="customerName"
          label="Customer Name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Select
          id="status"
          label="Status"
          options={statusOrderFilter}
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusOrderType)}
        />
        {/* <div className="products">
          <h3>Products</h3>
          <div className="products-list">
            {products.map((product, index) => (
              <div key={index} className="product">
                <Input
                  id={`productName-${index}`}
                  label="Product Name"
                  type="text"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                  required
                />
                <Input
                  id={`productQuantity-${index}`}
                  label="Quantity"
                  type="number"
                  placeholder="Quantity"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                  required
                />
                <Input
                  id={`productPrice-${index}`}
                  label="Price"
                  type="number"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            ))}
          </div>
          <div className="button-wrapper">
            <Button type="button" onClick={handleAddProduct}>Add Product</Button>
            {products.length > 1 && (
              <Button type="button" variant="danger" onClick={handleAddProduct}>
                Remove Product
              </Button>
            )}
          </div>
        </div> */}
        <div className="submit">
          <Button type="submit" variant="success">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OrderAdd;
