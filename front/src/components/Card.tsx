type Props = {
  title: string;
  children: React.ReactNode;
};

export function Card({ title, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-sm rounded border border-border bg-surface p-6 shadow-lg">
      <h1 className="mb-4 text-xl font-semibold text-text">{title}</h1>
      {children}
    </div>
  );
}
