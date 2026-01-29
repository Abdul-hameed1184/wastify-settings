import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  closeOnOverlay?: boolean;
  className?: string;
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
  position = "center",
  closeOnOverlay = true,
  className
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

  // Map `position` prop to flex alignment classes on the overlay
  const overlayPositionClass = (() => {
    switch (position) {
      case "top":
        return "items-start justify-center";
      case "bottom":
        return "items-end justify-center";
      case "left":
        return "items-center justify-start";
      case "right":
        return "items-center justify-end";
      case "top-left":
        return "items-start justify-start";
      case "top-right":
        return "items-start justify-end";
      case "bottom-left":
        return "items-end justify-start";
      case "bottom-right":
        return "items-end justify-end";
      case "center":
      default:
        return "items-center justify-center";
    }
  })();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${overlayPositionClass} bg-black/50 backdrop-blur-sm px-4 py-6 overflow-y-auto`}
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={` m-2 relative w-full border border-1 border-gray-200 ${sizeClasses[size]} bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-1 border-gray-200">
          {title && (
            <h2 id="modal-title" className="font-medium text-[1.5em] leading-[2em] tracking-[0] text-center align-middle">
              {title}
            </h2>
          )}
          <IoCloseSharp
            onClick={onClose}
            className=" p-2 rounded-md text-4xl hover:bg-red-500 hover:text-white cursor-pointer text-gray-500 border border-gray-200 "
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
