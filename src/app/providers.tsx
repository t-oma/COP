import { GamePlayStoreProvider } from "~/features/game-play/model/game-store-provider";
import { GameSettingsProvider } from "~/features/game-settings";

type ProvidersProps = {
  children: React.ReactNode;
};

function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <GameSettingsProvider>
      <GamePlayStoreProvider>{children}</GamePlayStoreProvider>
    </GameSettingsProvider>
  );
}

export { Providers };
