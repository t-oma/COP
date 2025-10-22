import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { isBrowser } from "~/shared/hooks/useLocalStorage";

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

  if (!isBrowser) return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="rounded-md bg-white p-4 shadow">
        {children}
      </div>
    </div>,
    document.body
  );
}

export { AppModal };
export type { AppModalProps };
