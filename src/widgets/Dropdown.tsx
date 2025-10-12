import { useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

function Dropdown({
  options,
  value,
  placeholder = "Select option",
  onChange,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-4 py-2 text-left shadow-sm transition-colors ${
          disabled
            ? "cursor-not-allowed bg-zinc-50 text-zinc-400"
            : "cursor-pointer hover:border-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        } `}
      >
        <span
          className={clsx(
            selectedOption ? "text-zinc-900" : "text-zinc-500",
            !selectedOption?.label ? "text-xs" : "text-sm"
          )}
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 text-zinc-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-zinc-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left transition-colors hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none ${
                option.value === value
                  ? "bg-blue-50 text-blue-700"
                  : "text-zinc-900"
              } `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { Dropdown };
