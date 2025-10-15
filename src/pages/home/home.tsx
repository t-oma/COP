import { useState } from "react";

import { GameSelection } from "~/features/game-selection";
import { DifficultyNamedSizes, GridNotation } from "~/shared/data/data";
import { Dropdown, RootLayout } from "~/widgets";
import type { DropdownOption } from "~/widgets/Dropdown";

const sizeOptions: DropdownOption[] = [
  { value: null, label: "All" },
  { value: DifficultyNamedSizes.easy, label: `Easy (${GridNotation.easy})` },
  {
    value: DifficultyNamedSizes.medium,
    label: `Medium (${GridNotation.medium})`,
  },
  { value: DifficultyNamedSizes.hard, label: `Hard (${GridNotation.hard})` },
];

function HomePage() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Categories</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">Difficulty:</span>
            <Dropdown
              options={sizeOptions}
              value={selectedSize}
              onChange={(value) => setSelectedSize(value)}
              className="w-32"
            />
          </div>
        </div>

        <GameSelection selectedSize={selectedSize} />
      </main>
    </RootLayout>
  );
}

export { HomePage };
