import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import GamesGrid from "@/components/GamesGrid";

export default function HomePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex items-center px-10 py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <GamesGrid />
      </main>

      <AppFooter />
    </>
  );
}
