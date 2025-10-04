import { AppFooter, AppHeader } from '~/widgets';

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      {children}

      <AppFooter />
    </div>
  );
}

export { RootLayout };
