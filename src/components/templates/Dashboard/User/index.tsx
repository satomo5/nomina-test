"use client";

import UserList from "./List";
import "./style.scss";
import UserDetail from "./Detail";
import UserAdd from "./Add";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const slug1 = params.slug[1] || 'default';
  const slug2 = params.slug[2];
  
  let renderChild = <></>;

  switch (slug1) {
    case "default":
      renderChild = <UserList />;
      break;

    case "add":
      renderChild = <UserAdd />;
      break;

    case "edit":
      renderChild = <UserAdd id={slug2} />;
      break;

    default:
      renderChild = <UserDetail slug={slug1} />;
      break;
  }

  return renderChild;
}
