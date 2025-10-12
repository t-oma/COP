import { useState } from "react";

import { GameSelection } from "~/features/game-selection";
import { Dropdown, RootLayout } from "~/widgets";
import type { Difficulty } from "~/entities/game";

const difficultyOptions = [
  { value: "all", label: "All" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

function HomePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "all"
  >("all");

  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Categories</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">Difficulty:</span>
            <Dropdown
              options={difficultyOptions}
              value={selectedDifficulty}
              onChange={(value) => setSelectedDifficulty(value as Difficulty)}
              className="w-32"
            />
          </div>
        </div>

        <GameSelection selectedDifficulty={selectedDifficulty} />
      </main>
    </RootLayout>
  );
}

export { HomePage };
