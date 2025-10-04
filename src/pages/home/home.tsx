import { GameSelection } from '~/features/game-selection';
import { RootLayout } from '~/widgets';

function HomePage() {
  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <GameSelection />
      </main>
    </RootLayout>
  );
}

export { HomePage };
