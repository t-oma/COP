type GridWidthProps = {
  width: number;
  children: React.ReactNode;
};

function GridWidth({ width, children }: Readonly<GridWidthProps>) {
  return (
    <div
      className="bg-accent-background grid flex-1 rounded-md p-4"
      style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
    >
      {children}
    </div>
  );
}

export { GridWidth };
