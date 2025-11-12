import React, { ReactNode } from "react";
import clsx from "clsx";
import { ImSpinner } from "react-icons/im";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "black" | "white";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "right",
  className,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-poppins rounded-lg font-medium shadow-sm focus:outline-none transition-colors duration-150 disabled:cursor-not-allowed";

  const variantStyles: Record<typeof variant, string> = {
    primary: "bg-green text-white hover:bg-green-600 disabled:bg-lightGreen",
    secondary: "bg-gray text-white hover:bg-gray-700 disabled:bg-lightgray",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    black: "bg-slate-900 text-white hover:bg-gray-900 disabled:bg-gray-600",
    white:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-200",
  };

  const sizeStyles: Record<typeof size, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base h-12",
    lg: "px-6 py-3 text-lg h-14",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <ImSpinner className="animate-spin" />
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </span>
      )}
    </button>
  );
};
