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
  ...rest 
}) => {
  const hasError = error?.some((err) => err.hasError);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className={`text-sm ${hasError ? "text-red-700" : "text-slate-300"}`}>{label}</label>}
      <input
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border-2 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none ${
          hasError
            ? "border-red-700 focus:border-red-500 hover:border-red-900"
            : "border-indigo-700 focus:border-indigo-800 hover:border-indigo-500"
        }  shadow-sm focus:shadow ${extraClasses}`}
        type={type}
        placeholder={placeholder}
        {...rest}
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
