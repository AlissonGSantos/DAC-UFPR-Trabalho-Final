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
  | "QUATERNARY"
  | "DISABLED";

export type ButtonSize = "SMALL" | "MEDIUM" | "LARGE";

export type IconPosition = "LEFT" | "RIGHT";

export interface ButtonProps {
  text?: string;
  onClick?: (param?: any) => void;
  type?: ButtonType;
  disabled?: boolean;
  extraClass?: string;
  size?: ButtonSize;
  typeButton?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  iconPosition?: IconPosition; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "PRIMARY",
  disabled = false,
  size = "MEDIUM",
  extraClass = "",
  typeButton,
  children,
  iconPosition = "LEFT", 
}) => {
  const { getButtonColor, getButtonSize } = useButton(type, size);

  return (
    <button
      className={`cursor-pointer flex items-center justify-center gap-2 ${getButtonColor()} ${getButtonSize()} rounded-lg ${extraClass}`}
      onClick={onClick}
      disabled={disabled}
      type={typeButton ?? "button"}
    >
      {iconPosition === "LEFT" && children}
      {text && <span>{text}</span>}
      {iconPosition === "RIGHT" && children}
    </button>
  );
};

export default Button;