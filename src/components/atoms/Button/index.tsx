import React, { ButtonHTMLAttributes } from "react";
import "./style.scss";
import Iconify from "../Iconify";
import Link from "next/link";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "default" | "success" | "secondary" | "danger" | "warning";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
};

export default function Button({
  children,
  variant = "default",
  full,
  loading,
  disabled,
  href,
  ...props
}: ButtonProps) {
  let classNameBtn = `btn btn-${variant}`;

  if (full) classNameBtn += " full";

  if (href) {
    return (
      <Link className={classNameBtn} href={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={classNameBtn}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <Iconify icon="eos-icons:bubble-loading" size={24} />
        ) : (
          children
        )}
      </button>
    );
  }
}
