"use client";

import React from "react";

interface FigmaButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const FigmaButton: React.FC<FigmaButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyles = "flex justify-center items-center font-poppins font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#08AD98] hover:bg-[#078c7d] text-white focus:ring-[#08AD98] shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gray-100 hover:bg-gray-200 text-[#032C3D] focus:ring-gray-300",
    outline: "border-2 border-[#08AD98] text-[#08AD98] hover:bg-[#08AD98] hover:text-white focus:ring-[#08AD98]"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-8 py-4 text-lg gap-4",
    lg: "px-12 py-5 text-xl gap-5"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none";
  const widthStyles = fullWidth ? "w-full" : "";

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${widthStyles}
    ${disabled ? disabledStyles : ""}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className="font-poppins font-bold text-current">
        {children}
      </span>
    </button>
  );
};

export default FigmaButton;
