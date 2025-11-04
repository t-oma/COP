import { memo } from "react";

type TopPanelProps = {
  children: React.ReactNode;
};

function TopPanel({ children }: Readonly<TopPanelProps>) {
  return (
    <div className="absolute top-0 right-0 left-0 flex items-center justify-between gap-4 p-2 px-4">
      {children}
    </div>
  );
}

const TopPanelMemo = memo(TopPanel);

export { TopPanelMemo as TopPanel };
