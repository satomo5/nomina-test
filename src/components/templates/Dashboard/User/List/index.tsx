"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./style.scss";
import { StatusUserType } from "@/types/status";
import Button from "@/components/atoms/Button";
import { useUserContext } from "@/context/user";
import Image from "next/image";
import Badge from "@/components/atoms/Badge";
import { badgeRoleStatus } from "@/enum";
import Loader from "@/components/atoms/Loader";
import { statusUserRoleFilter } from "@/const/filter";
import Separator from "@/components/atoms/Separator";
import { RoleType } from "@/types/user";
import Empty from "@/components/atoms/Empty";

function UserList() {
  const { isLoading, getFilterData } = useUserContext();
  const [filterRole, setFilterRole] = useState<RoleType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<StatusUserType | "all">(
    "all"
  );

  return (
    <div className="card-wrapper data-list">
      <div className="wrapper">
        <h2>User Management</h2>
        <Button variant="success" href="/dashboard/user/add">
          Add
        </Button>
      </div>
      <div className="filter-wrapper">
        <div className="filter">
          <label>Filter by role:</label>
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value as RoleType | "all");
            }}
          >
            {[{ value: "all", text: "All" }, ...statusUserRoleFilter].map(
              (item) => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              )
            )}
          </select>
        </div>
        <Separator direction="vertical" length="20px" />
        <div className="filter">
          <label>Filter by status:</label>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as StatusUserType | "all");
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : getFilterData({ role: filterRole, status: filterStatus })?.length >
        0 ? (
        <div className="list-wrapper">
          {getFilterData({ role: filterRole, status: filterStatus })?.map(
            (item, index) => {
              const status = badgeRoleStatus(item.status);

              return (
                <Link
                  key={item.id}
                  href={`/dashboard/user/${item.id}`}
                  className="user-card"
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
                      <div className="status">
                        <Badge variant={status.variant}>{status.text}</Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default UserList;
