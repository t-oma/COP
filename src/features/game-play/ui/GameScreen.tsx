import { memo } from "react";

type GameScreenProps = {
  children: React.ReactNode;
};

function GameScreen({ children }: Readonly<GameScreenProps>) {
  return <div className="relative flex flex-1 p-16">{children}</div>;
}

const GameScreenMemo = memo(GameScreen);

export { GameScreenMemo as GameScreen };
