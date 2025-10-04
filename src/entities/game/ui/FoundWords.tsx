const EMPTY_ARRAY: string[] = [];

interface FoundWordsProps {
  foundWords?: string[];
  totalWords?: string[];
}

export default function FoundWords({
  foundWords = EMPTY_ARRAY,
  totalWords = EMPTY_ARRAY,
}: FoundWordsProps) {
  const remainingWords = totalWords.filter(
    (word) => !foundWords.includes(word)
  );

  return (
    <div className="bg-accent-background w-64 border-r border-zinc-200 p-6">
      <div className="space-y-6">
        {/* Found Words Section */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-zinc-900">
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
                  <span className="text-xs">✓</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Remaining Words Section */}
        {remainingWords.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium text-zinc-700">
              Words to Find
            </h4>
            <div className="space-y-1">
              {remainingWords.map((word) => (
                <div
                  key={word}
                  className="rounded-md bg-zinc-100 p-2 text-sm text-zinc-600"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
