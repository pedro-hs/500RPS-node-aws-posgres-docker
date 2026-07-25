import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import NewEventPage from './pages/NewEventPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'events/new', element: <NewEventPage /> },
    ],
  },
]);
