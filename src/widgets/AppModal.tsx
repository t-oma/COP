import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { isBrowser } from "~/shared/utils";

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];

  return Array.from(
    container.querySelectorAll(focusableSelectors.join(", "))
  ) as HTMLElement[];
}

type AppModalProps = {
  children: React.ReactNode;
  open: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
};

function AppModal({
  children,
  open,
  closeOnBackdropClick = true,
  closeOnEsc = false,
  onClose,
}: Readonly<AppModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (!closeOnBackdropClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, closeOnBackdropClick, open]);

  useEffect(() => {
    if (!open) return;
    if (!closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, closeOnEsc]);

  // Focus trapping
  useEffect(() => {
    if (!open) return;

    // Save the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    const modalElement = modalRef.current;
    if (modalElement) {
      // const focusableElements = getFocusableElements(modalElement);
      // if (focusableElements.length > 0) {
      //   focusableElements[0].focus();
      // } else {
      modalElement.focus();
      // }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableElements = getFocusableElements(modalElement);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move to next element
        if (activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus when modal closes
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === "function"
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [open]);

  if (!isBrowser) return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="rounded-md bg-white p-4 shadow"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export { AppModal };
export type { AppModalProps };
