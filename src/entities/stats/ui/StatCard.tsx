type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: string;
};

function StatCard({
  title,
  value,
  description,
  icon,
}: Readonly<StatCardProps>) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-foreground text-3xl font-bold">{value}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

export { StatCard };
