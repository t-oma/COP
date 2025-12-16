import { memo } from "react";

type SidePanelProps = {
  children: React.ReactNode;
};

function SidePanel({ children }: Readonly<SidePanelProps>) {
  return (
    <div className="bg-accent-background flex w-64 flex-col justify-between border-r border-zinc-200 p-6">
      {children}
    </div>
  );
}

const SidePanelMemo = memo(SidePanel);

export { SidePanelMemo as SidePanel };
