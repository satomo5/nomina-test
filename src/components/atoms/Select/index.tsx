import React, { SelectHTMLAttributes } from "react";
import "./style.scss";

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  options: { value: string; text: string }[];
};

export default function Select({ id, label, options, ...props }: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
}
