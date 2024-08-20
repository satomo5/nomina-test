"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import { StatusOrderType } from "@/types/status";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { statusOrderFilter } from "@/const/filter";
import Button from "@/components/atoms/Button";
import { useProducContext } from "@/context/product";
import Separator from "@/components/atoms/Separator";
import { currencyFormat, getRandomInt } from "@/lib/helper";
import Empty from "@/components/atoms/Empty";
import { useOrderContext } from "@/context/order";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";
import { useUserContext } from "@/context/user";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import AlertBox from "@/components/atoms/Alert";

const INIT_ALERT: {
  type: "error";
  message: string;
} = {
  type: "error",
  message: "",
};

function OrderAdd({ id }: { id?: string }) {
  const router = useRouter();
  const { data: dataProduct } = useProducContext();
  const { data: dataUser, isLoading: loadingUser } = useUserContext();
  const { addData, editData, getDetailData } = useOrderContext();
  const [alert, setAlert] = useState(INIT_ALERT);
  const [customer, setCustomer] = useState<UserType | null>(null);
  const [status, setStatus] = useState<StatusOrderType>("pending");
  const [chooseProduct, setChooseProduct] = useState(true);
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      amount: number;
      total: number;
      price: number;
      maxAmount: number;
    }[]
  >([]);
  const order = getDetailData(Number(id));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setAlert(INIT_ALERT);

    if (!customer) {
      window.scrollTo(0, 0);
      setAlert({
        type: "error",
        message: "Please select Customer",
      });

      return;
    }

    const formData = {
      customer,
      status,
      total: products.reduce((a, b) => a + b.total, 0),
      products: products.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.amount,
        price: item.total,
      })),
    };

    if (id && order) {
      editData(Number(id), { ...order, ...formData });
    } else {
      addData({
        id: getRandomInt(1000),
        ...formData,
      });
    }

    router.replace("/dashboard/order");
  }

  const pickProduct = (id: number) => {
    const findProduct = dataProduct.find((item) => item.id === id);
    const hasPicked = !!products.find((item) => item.id === id);

    if (hasPicked) {
      setProducts(products.filter((item) => item.id !== id));
    } else if (findProduct) {
      setProducts([
        ...products,
        {
          id,
          name: findProduct.name,
          amount: 0,
          total: 0,
          price: findProduct.price,
          maxAmount: findProduct.quantity,
        },
      ]);
    }
  };

  // useEffect(() => {
  //   if (dataProduct)
  //     setProducts(
  //       dataProduct.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //         amount: 0,
  //         total: 0,
  //       }))
  //     );
  // }, [dataProduct]);

  const users = dataUser?.filter(
    (user) => user.role === "viewer" || user.role === "manager"
  );

  return (
    <div className="card-wrapper add-order">
      <h2>Add Order</h2>
      {!!alert.message && (
        <div>
          <AlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(INIT_ALERT)}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "10px" }}>
          Choose User (Viewer or Manager)
        </h3>
        <div className="users">
          {loadingUser ? (
            <Loader />
          ) : users?.length > 0 ? (
            <div className="products-list">
              {users?.map((item, index) => (
                <div
                  key={item.id}
                  className={`user-card ${
                    customer?.id === item.id ? "selected" : ""
                  }`}
                  onClick={() => setCustomer(item)}
                >
                  <div className="layout">
                    <div>
                      <Image
                        src={item.image}
                        width={50}
                        height={50}
                        alt={`avatar ${item.username}`}
                      />
                    </div>
                    <div>
                      <p className="username">{item.username}</p>
                      <p className="role">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty height="400px" />
          )}
        </div>
        <Select
          id="status"
          label="Status"
          options={statusOrderFilter}
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusOrderType)}
        />
        <Separator margin="10px 0 20px" />
        {chooseProduct ? (
          <div className="products">
            <h3>Choose Products</h3>
            {dataProduct?.length > 0 ? (
              <div className="products-list">
                {dataProduct?.map((product, index) => (
                  <div
                    key={`choose-${index}`}
                    className={`product cursor-pointer ${
                      products.find((item) => item.id === product.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => pickProduct(product.id)}
                  >
                    <p className="name">{product.name}</p>
                    <div className="product-info">
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {currencyFormat(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        ) : (
          <div className="products">
            <h3>Products</h3>
            <div className="products-list">
              {products.map((product, index) => (
                <div key={index} className="product">
                  <div className="description">
                    <p>
                      <b>{product.name}</b>
                    </p>
                    <p className="info">
                      Max Quantity: {product.maxAmount} | Price:{" "}
                      {currencyFormat(product.price)}
                    </p>
                  </div>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      const newProducts = [...products];

                      newProducts[index].amount = Number(e.target.value);
                      newProducts[index].total =
                        Number(e.target.value) * product.price;

                      setProducts(newProducts);
                    }}
                    value={product.amount}
                    max={product.maxAmount}
                    min={0}
                    required
                  />
                  <Separator margin="10px 0 20px" />
                  <div className="total">
                    <p>Subtotal</p>
                    <p> {currencyFormat(product.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {chooseProduct ? (
          <div className="submit">
            <Button
              type="button"
              variant={products.length > 0 ? "default" : "secondary"}
              disabled={products.length === 0}
              onClick={() => setChooseProduct(false)}
            >
              {products.length > 0 ? "Save Product" : "Choose Product First"}
            </Button>
          </div>
        ) : (
          <>
            <div className="total-price">
              <p>Total</p>
              <p>
                <b>
                  {currencyFormat(products.reduce((a, b) => a + b.total, 0))}
                </b>
              </p>
            </div>
            <Separator margin="10px 0 20px" />
            <div className="submit">
              <Button type="button" onClick={() => setChooseProduct(true)}>
                Choose Product
              </Button>
              <Button type="submit" variant="success">
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default OrderAdd;
