import { useState } from "react";

import { SettingsModal } from "~/features/game-settings";
import type { Game } from "../model/types";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowSettings(true)}
      className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 p-4 shadow-sm hover:bg-zinc-100"
    >
      <SettingsModal
        open={showSettings}
        gameId={game.id}
        onClose={() => setShowSettings(false)}
      />

      <span className="text-xl">{game.title}</span>
    </button>
  );
}
