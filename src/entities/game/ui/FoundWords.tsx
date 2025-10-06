import clsx from "clsx";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const EMPTY_ARRAY: string[] = [];

interface FoundWordsProps {
  foundWords?: string[];
  totalWords?: string[];
}

function FoundWords({
  foundWords = EMPTY_ARRAY,
  totalWords = EMPTY_ARRAY,
}: FoundWordsProps) {
  const [visible, setVisible] = useState(false);

  const remainingWords = totalWords.filter(
    (word) => !foundWords.includes(word)
  );

  return (
    <div className="bg-accent-background w-64 border-r border-zinc-200 p-6">
      <div className="space-y-6">
        {/* Found Words Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-900">
            Found Words ({foundWords.length}/{totalWords.length})
          </h3>
          <div className="space-y-2">
            {foundWords.length === 0 ? (
              <p className="text-sm text-zinc-500 italic">No words found yet</p>
            ) : (
              foundWords.map((word) => (
                <div
                  key={word}
                  className="flex items-center justify-between rounded-md bg-green-100 p-2 text-green-800"
                >
                  <span className="font-medium">{word}</span>
                  <span className="text-xs">
                    <Check className="h-4 w-4" />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Remaining Words Section */}
        {remainingWords.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-zinc-700">
                Words to Find
              </h4>
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                aria-label="Toggle visibility"
                className="hover:bg-background inline-flex cursor-pointer items-center justify-center rounded-md bg-zinc-100 p-2 text-sm text-zinc-600"
              >
                {visible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              {remainingWords.map((word) => (
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
        )}
      </div>
    </div>
  );
}

export { FoundWords };
