import { memo } from "react";

import { Check } from "lucide-react";
import { RemainingWords } from "./RemainingWords";

const EMPTY_ARRAY: string[] = [];

type FoundWordsProps = {
  foundWords?: string[];
  totalWords?: string[];
};

function FoundWords({
  foundWords = EMPTY_ARRAY,
  totalWords = EMPTY_ARRAY,
}: Readonly<FoundWordsProps>) {
  const remainingWords = totalWords.filter(
    (word) => !foundWords.includes(word)
  );

  return (
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

      {remainingWords.length > 0 && <RemainingWords words={remainingWords} />}
    </div>
  );
}

const FoundWordsMemo = memo(FoundWords);

export { FoundWordsMemo as FoundWords };
