import React from "react";

export const Button = ({ children, className, onClick, variant }) => (
  <button
    onClick={onClick}
    className={`${className} ${variant === "default" ? "bg-blue-500 text-white" : variant === "outline" ? "bg-green-500 text-white" : "bg-red-500 text-white"} p-2 rounded`}
  >
    {children}
  </button>
);
