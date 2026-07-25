import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex gap-4 border-b bg-white p-4">
        <Link to="/">Dashboard</Link>
        <Link to="/events/new">Add Event</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
