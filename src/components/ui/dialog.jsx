import React, { createContext, useContext } from "react";
import "../../css/dialog.css";

const DialogContext = createContext(null);

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="custom-dialog-root">
        {children}
      </div>
    </DialogContext.Provider>
  );
};

export const DialogContent = ({ className, children }) => {
  const { onOpenChange } = useContext(DialogContext);
  return (
    <div 
      className="custom-dialog-overlay" 
      onClick={() => onOpenChange(false)}
    >
      <div 
        className={`custom-dialog-content ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ className, children }) => {
  return <div className={`custom-dialog-header ${className || ""}`}>{children}</div>;
};

export const DialogTitle = ({ className, children }) => {
  return <h2 className={`custom-dialog-title ${className || ""}`}>{children}</h2>;
};
