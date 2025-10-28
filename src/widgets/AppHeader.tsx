import { Link } from "react-router";

function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white/80 p-4 px-6 shadow-sm backdrop-blur-sm md:px-10">
      <Link
        to="/"
        className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 md:text-2xl"
      >
        Word Search
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/stats"
          className="text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
        >
          Stats
        </Link>
      </nav>
    </header>
  );
}

export { AppHeader };
