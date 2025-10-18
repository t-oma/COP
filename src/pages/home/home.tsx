import { useState } from "react";

import { SizeDropdown } from "~/features/filter-games";
import { GameSelection } from "~/features/game-selection";
import { DifficultyNamedSizes, GridNotation, Sizes } from "~/shared/data/data";
import { RootLayout } from "~/widgets";
import type { SizeDropdownOption } from "~/features/filter-games";

const sizeOptions: SizeDropdownOption[] = [
  { value: null, label: "All" },
  { value: DifficultyNamedSizes.easy, label: `Easy (${GridNotation.easy})` },
  {
    value: DifficultyNamedSizes.medium,
    label: `Medium (${GridNotation.medium})`,
  },
  { value: DifficultyNamedSizes.hard, label: `Hard (${GridNotation.hard})` },
];

function HomePage() {
  const [selectedSize, setSelectedSize] = useState<
    (typeof Sizes)[number] | null
  >(null);

  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Categories</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">Difficulty:</span>
            <SizeDropdown
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
