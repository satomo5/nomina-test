"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { statusUserRoleFilter } from "@/const/filter";
import Button from "@/components/atoms/Button";
import { RoleType } from "@/types/user";
import { useUserContext } from "@/context/user";
import { getRandomInt } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/Loader";

function UserAdd({ id }: { id?: string }) {
  const router = useRouter();
  const { addData, editData, getDetailData, isLoading } = useUserContext();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<RoleType>("admin");
  const user = getDetailData(Number(id));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = { username, role };

    if (id && user) {
      editData(Number(id), { ...user, ...formData });
    } else {
      addData({
        id: getRandomInt(1000),
        image: "https://dummyjson.com/icon/oliviaw/128",
        status: "active",
        ...formData,
      });
    }

    router.replace("/dashboard/user");
  }

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
    }
  }, [user]);

  if (isLoading && id) return <Loader />;

  return (
    <div className="card-wrapper add-form">
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Select
          id="role"
          label="Role"
          options={statusUserRoleFilter}
          value={role}
          onChange={(e) => setRole(e.target.value as RoleType)}
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

export default UserAdd;
