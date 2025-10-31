import { useState } from "react";

import { SettingsModal } from "~/features/game-settings";
import type { Game } from "../model/types";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowSettings(true)}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
    >
      <SettingsModal
        open={showSettings}
        gameId={game.id}
        onClose={() => setShowSettings(false)}
      />

      <div className="flex flex-col items-center justify-center gap-3">
        <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
          {game.icon}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">{game.title}</h3>
        </div>
      </div>

      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
    </button>
  );
}
