import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import NewCountryPage from './pages/NewCountryPage';
import NewEventPage from './pages/NewEventPage';
import NewVehicleTypePage from './pages/NewVehicleTypePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'events/new', element: <NewEventPage /> },
      { path: 'countries/new', element: <NewCountryPage /> },
      { path: 'vehicle-types/new', element: <NewVehicleTypePage /> },
    ],
  },
]);

