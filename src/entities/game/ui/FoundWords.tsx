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
    (word) => !foundWords.includes(word),
  );

  return (
    <div className="w-64 border-r border-zinc-200 bg-accent-background p-6">
      <div className="space-y-6">
        {/* Found Words Section */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-3">
            Found Words ({foundWords.length}/{totalWords.length})
          </h3>
          <div className="space-y-2">
            {foundWords.length === 0 ? (
              <p className="text-sm text-zinc-500 italic">No words found yet</p>
            ) : (
              foundWords.map((word) => (
                <div
                  key={word}
                  className="flex items-center justify-between p-2 bg-green-100 text-green-800 rounded-md"
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
            <h4 className="text-sm font-medium text-zinc-700 mb-2">
              Words to Find
            </h4>
            <div className="space-y-1">
              {remainingWords.map((word) => (
                <div
                  key={word}
                  className="text-sm text-zinc-600 p-2 bg-zinc-100 rounded-md"
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
