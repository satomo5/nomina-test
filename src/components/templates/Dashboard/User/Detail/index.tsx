"use client";

import React, { useState } from "react";
import "./style.scss";
import { useUserContext } from "@/context/user";
import Badge from "@/components/atoms/Badge";
import { badgeRoleStatus } from "@/enum";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import { useRouter } from "next/navigation";

function UserDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [modalDelete, setModalDelete] = useState(false);
  const { getDetailData, setStatus, setDeleted, isLoading } = useUserContext();
  const user = getDetailData(Number(slug));

  if (isLoading) return <Loader />;

  if (!user) {
    return (
      <div className="card-wrapper add-order">
        <h2>User not found</h2>
      </div>
    );
  }

  const status = badgeRoleStatus(user.status);

  const handleDelete = (id: number) => {
    setDeleted(id);
    router.replace("/dashboard/user");
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
            <Image
              src={user.image}
              width={100}
              height={100}
              alt={`avatar ${user.username}`}
            />
          </div>
          <div>
            <div className="detail-wrapper">
              <p>Name:</p>
              <p>
                <b>{user.username}</b>
              </p>
            </div>
            <div className="detail-wrapper">
              <p>Role:</p>
              <p>
                <b>{user.role}</b>
              </p>
            </div>
            <div className="detail-wrapper">
              <p>Status:</p>
              <p>
                <Badge variant={status.variant}>{status.text}</Badge>
              </p>
            </div>
            <div className="btn-action">
              <Button href={`/dashboard/user/edit/${user.id}`}>Edit</Button>
              <Button
                variant={user.status === "active" ? "warning" : "success"}
                onClick={() =>
                  setStatus(
                    user.id,
                    user.status === "active" ? "inactive" : "active"
                  )
                }
              >
                {user.status === "active" ? "Deactivated" : "Activated"}
              </Button>
              <Button variant="danger" onClick={() => setModalDelete(true)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalDelete} onClose={() => setModalDelete(false)}>
        <b>Are you sure want to delete {user.username}?</b>
        <p>This user will be deleted and you can't undo this action.</p>
        <div className="modal-action">
          <Button variant="secondary" onClick={() => setModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default UserDetail;
