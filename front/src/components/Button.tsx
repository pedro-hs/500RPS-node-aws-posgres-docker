type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children, className = '', type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      className={`rounded-md bg-accent px-3 py-2 text-white hover:bg-accent-hover disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
