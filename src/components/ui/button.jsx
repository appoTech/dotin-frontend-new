import React from "react";
import "../../css/button.css";

export const Button = ({ className, variant, children, ...props }) => {
  return (
    <button 
      className={`custom-btn custom-btn-${variant || "default"} ${className || ""}`} 
      {...props}
    >
      {children}
    </button>
  );
};
