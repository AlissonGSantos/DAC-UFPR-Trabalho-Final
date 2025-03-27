"use client";

import React from "react";

export type InputType =
  | "search"
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url";

export interface InputError {
  hasError: boolean;
  message: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: InputType;
  label: string;
  placeholder?: string;
  error?: InputError[];
  extraClasses?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  error = [],
  extraClasses = "",
  ...rest // Captura as propriedades do `register`
}) => {
  const hasError = error?.some((err) => err.hasError); // Verifica se há algum erro

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-sky-700">{label}</label>}
      <input
        className={`w-full bg-transparent placeholder:text-slate-400 text-sky-700 text-sm border-2 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none ${
          hasError
            ? "border-red-700 focus:border-red-500"
            : "border-sky-700 focus:border-sky-400"
        } hover:border-sky-300 shadow-sm focus:shadow ${extraClasses}`}
        type={type}
        placeholder={placeholder}
        {...rest} // Repasse todas as propriedades do `register`
      />
      {error
        ?.filter((err) => err.hasError)
        .map((err, index) => (
          <li
            key={`${err.message}-${index}`}
            className="text-xs ml-4 text-red-800"
          >
            {err.message}
          </li>
        ))}
    </div>
  );
};

export default Input;
