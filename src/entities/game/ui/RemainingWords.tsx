import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface RemainingWordsProps {
  words: string[];
}

function RemainingWords({ words }: Readonly<RemainingWordsProps>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-zinc-700">Words to Find</h4>
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide remaining words" : "Show remaining words"}
          className="hover:bg-background inline-flex cursor-pointer items-center justify-center rounded-md bg-zinc-100 p-2 text-sm text-zinc-600"
        >
          {visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex flex-col space-y-1">
        {words.map((word) => (
          <span
            key={word}
            className={clsx(
              "rounded-md bg-zinc-100 p-2 text-sm text-zinc-600 transition-all",
              !visible && "blur-xs select-none"
            )}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export { RemainingWords };
