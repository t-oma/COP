import { AppFooter, AppHeader } from "~/widgets";

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      {children}

      <AppFooter />
    </div>
  );
}

export { RootLayout };
