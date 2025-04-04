"use client";

import React from "react";
import { useButton } from "./useButton";

export type ButtonType =
  | "PRIMARY"
  | "SECONDARY"
  | "TERTIARY"
  | "DANGER"
  | "SUCCESS"
  | "WARNING"
  | "QUATERNARY";

export type ButtonSize = "SMALL" | "MEDIUM" | "LARGE";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: ButtonType;
  disabled?: boolean;
  extraClass?: string;
  size?: ButtonSize;
  typeButton?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "PRIMARY",
  disabled = false,
  size = "MEDIUM",
  extraClass = "",
  typeButton,
}) => {
  const { getButtonColor, getButtonSize } = useButton(type, size);

  return (
    <button
      className={`cursor-pointer ${getButtonColor()} ${getButtonSize()} rounded-lg ${extraClass}`}
      onClick={onClick}
      disabled={disabled}
      type={typeButton ?? "button"}
    >
      {text}
    </button>
  );
};

export default Button;
