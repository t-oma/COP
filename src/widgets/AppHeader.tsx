import { Link } from 'react-router';

function AppHeader() {
  return (
    <header className="bg-accent-background flex items-center justify-between border-b border-zinc-300 p-4 px-10">
      <Link to="/" className="text-xl">
        Word Search
      </Link>

      <Link to="/stats" className="text-xl">
        Stats
      </Link>
    </header>
  );
}

export { AppHeader };
