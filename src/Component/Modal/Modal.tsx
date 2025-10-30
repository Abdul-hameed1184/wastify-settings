import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
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
  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC key
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      role="button"                 // 👈 tells screen readers this is clickable
      tabIndex={0}                  // 👈 makes it focusable for keyboard users
      onClick={closeOnOverlay ? onClose : undefined}
      onKeyDown={(e) => e.key === "Enter" && closeOnOverlay && onClose()} // 👈 accessibility fix
    >
      <div
        className={` m-2 relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 pt-4">
          {title && (
            <h2 id="modal-title" className="text-2xl font-bold m-2">
              {title}
            </h2>
          )}
          <MdCancel
            onClick={onClose}
            className="text-2xl text-red-500 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClose()}
          />
        </div>

        {/* Body */}
        <div className="px-4 py-3">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
};
