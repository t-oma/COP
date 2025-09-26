export default function CategoryItems({
  stat,
}: Readonly<{ stat: Record<string, unknown> }>) {
  return (
    <>
      {Object.entries(stat).map(([key, value]) => (
        <p key={key}>
          {key[0].toUpperCase() + key.slice(1)}: {String(value)}
        </p>
      ))}
    </>
  );
}
