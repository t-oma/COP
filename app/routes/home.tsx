import { AppFooter, AppHeader } from "~/components";
import type { Route } from "./+types/home";

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <div></div>
      </main>

      <AppFooter />
    </>
  );
}
