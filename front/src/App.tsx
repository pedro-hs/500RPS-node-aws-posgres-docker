import { NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-accent' : 'text-white hover:text-accent';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/events/new', label: 'Add Event' },
  { to: '/countries/new', label: 'Add Country' },
  { to: '/vehicle-types/new', label: 'Add Vehicle Type' },
] as const;

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="flex gap-4 bg-header p-4">
        {links.map(({ to, label, ...rest }) => (
          <NavLink key={to} to={to} className={linkClass} {...rest}>
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
}
