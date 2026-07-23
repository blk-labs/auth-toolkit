import { forwardRef } from "react";
import type { ModalProps } from "./Modal.types";
import { classNames } from "../utils/classNames";

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, className }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          className={classNames(
            "bg-white rounded-lg shadow-lg max-w-md w-full p-6",
            className
          )}
        >
          {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
          {children}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-danger-500 text-white rounded-md hover:bg-danger-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;