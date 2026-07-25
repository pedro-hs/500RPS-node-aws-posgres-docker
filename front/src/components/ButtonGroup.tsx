type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function ButtonGroup<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <div className="flex w-full overflow-hidden rounded-md border border-border">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 border-r border-border px-3 py-1.5 capitalize last:border-r-0 ${
              active ? 'bg-accent text-white' : 'bg-surface text-text hover:bg-bg'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
