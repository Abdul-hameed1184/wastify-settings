// components/Modal.tsx
import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { Button } from "../Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    //   onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-lg`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          {title && (
            <h2 id="modal-title" className="text-2xl font-bold">
              {title}
            </h2>
          )}
          
           <MdCancel onClick={onClose} className="text-2xl text-red-500" />
        
        </div>

        {/* Body */}
        <div className="px-4 py-3">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
};
