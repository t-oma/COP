export default function Category({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
