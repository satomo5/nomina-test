import React, { InputHTMLAttributes } from "react";
import "./style.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
};

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}
