"use client";

import React, { useState } from "react";
import "./style.scss";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import { useRouter } from "next/navigation";
import { useProducContext } from "@/context/product";
import { currencyFormat } from "@/lib/helper";

function ProductDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [modalDelete, setModalDelete] = useState(false);
  const { getDetailData, setDeleted } = useProducContext();
  const product = getDetailData(Number(slug));


  if (!product) {
    return (
      <div className="card-wrapper add-order">
        <h2>Product not found</h2>
      </div>
    );
  }

  const handleDelete = (id: number) => {
    setDeleted(id);
    router.replace("/dashboard/product");
  };

  return (
    <>
      <div className="card-wrapper detail">
        <div className="header-section">
          <h2>Detail User</h2>
          <Button variant="secondary" href="/dashboard/user">
            Back
          </Button>
        </div>
        <div className="detail-layout">
          <div>
            <div className="detail-wrapper">
              <p>Name:</p>
              <p>
                <b>{product.name}</b>
              </p>
            </div>
            <div className="detail-wrapper">
              <p>Quantity:</p>
              <p>
                <b>{product.quantity}</b>
              </p>
            </div>
            <div className="detail-wrapper">
              <p>Price:</p>
              <p>
                <b>{currencyFormat(product.price)}</b>
              </p>
            </div>
            <div className="btn-action">
              <Button href={`/dashboard/product/edit/${product.id}`}>Edit</Button>
              <Button variant="danger" onClick={() => setModalDelete(true)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalDelete} onClose={() => setModalDelete(false)}>
        <b>Are you sure want to delete {product.name}?</b>
        <p>This user will be deleted and you can&apos;t undo this action.</p>
        <div className="modal-action">
          <Button variant="secondary" onClick={() => setModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetail;
