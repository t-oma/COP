import { AppFooter, AppHeader } from "~/widgets";

type RootLayoutProps = {
  children: React.ReactNode;
};

function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      {children}

      <AppFooter />
    </div>
  );
}

export { RootLayout };
