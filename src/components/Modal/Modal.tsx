import classNames from "classnames";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getFocusableElements, nextFocus } from "../../utils/modal";
import { usePortal } from "../../hooks/usePortal";

const Frame: React.FC<{
  closeOnClickOutside?: boolean;
  children: React.ReactNode;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
}> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  const portal = usePortal();
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  // close on click outside
  const containerRef = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) onClose();
  };

  // Hanlde keydown events for closing and focus switching
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) onClose();
          break;
        }
        case "Tab": {
          e.preventDefault();
          const shiftKeyPressedToReverse = e.shiftKey;
          nextFocus(
            getFocusableElements(containerRef.current),
            !shiftKeyPressedToReverse
          );
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, onClose, open]);

  // aria-hidden
  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocusedElementRef.current =
        (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(containerRef.current));
    } else {
      previousFocusedElementRef.current?.focus?.();
      previousFocusedElementRef.current = null;
    }
  }, [open, portal]);

  if (!open) return null; // depending on general use case, this might not be necessary as invisibility is handled by the className and aria-hidden for screen readers

  return ReactDOM.createPortal(
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
      className={classNames(
        "fixed inset-0 z-10 p-8 text-white bg-gray-600/90",
        `${open ? "visible" : "invisible"}`
      )}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
      data-testid="modal-overlay"
    >
      <div className="relative w-full max-w-md mx-auto mt-8" ref={containerRef}>
        {/* contents */}
        <div className="overflow-hidden bg-gray-800 rounded shadow-xl">
          {children}
        </div>
        {/* closer in the corner */}
        <button
          className="absolute flex justify-center w-8 h-8 transition-all duration-300 ease-in-out transform bg-gray-600 border-2 border-gray-600 rounded-full shadow-xl outline-none cursor-pointer -top-2 -right-2 focus:border-blue-300 hover:rotate-180"
          onClick={() => onClose()}
          title="Close modal"
          data-testid="modal-close-button"
        >
          <span className="text-2xl leading-6 select-none">&times;</span>
        </button>
      </div>
    </div>,
    portal.current
  );
};

const Head: React.FC<PropsWithChildren> = ({ children }) => (
  <div aria-label="modal-title" className="block px-4 py-2 bg-gray-900">
    {children}
  </div>
);

const Body: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const Modal = { Frame, Head, Body };
