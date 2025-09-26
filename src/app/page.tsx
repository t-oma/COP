import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import GamesGrid from "@/components/GamesGrid";

export default function HomePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <GamesGrid />
      </main>

      <AppFooter />
    </>
  );
}
