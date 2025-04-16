"use client";

import React from "react";

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: any; label: string }>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
  extraClasses?: string;
  label?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  placeholder = "Selecione uma opção",
  disabled = false,
  error = null,
  extraClasses = "",
  label = "",
  ...rest
}) => {
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`text-sm ${hasError ? "text-red-700" : "text-slate-300"}`}
        >
          {label}
        </label>
      )}

      <select
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border-2 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none ${
          hasError
            ? "border-red-700 focus:border-red-500 hover:border-red-900"
            : "border-indigo-700 focus:border-indigo-800 hover:border-indigo-500"
        } shadow-sm focus:shadow ${extraClasses}`}
        value={value}
        disabled={disabled}
        {...rest}
      >
        <option
          value=""
          className="text-white font-bold bg-indigo-950 hover:bg-indigo-900 mx-4"
          disabled
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-white font-bold bg-indigo-950 hover:bg-indigo-900"
          >
            {option.label}
          </option>
        ))}
      </select>
      {hasError && <span className="text-xs text-red-800">{error}</span>}
    </div>
  );
};

export default SelectInput;
