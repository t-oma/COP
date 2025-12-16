import { GameSettingsProvider } from "~/features/game-settings";

type ProvidersProps = {
  children: React.ReactNode;
};

function Providers({ children }: Readonly<ProvidersProps>) {
  return <GameSettingsProvider>{children}</GameSettingsProvider>;
}

export { Providers };
