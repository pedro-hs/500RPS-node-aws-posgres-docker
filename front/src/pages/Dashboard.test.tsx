import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCountryVolume, getVehicleTypeCount } from '../api/traffic';
import { renderWithProviders } from '../test/render';
import Dashboard from './Dashboard';

vi.mock('../api/traffic', () => ({
  getCountryVolume: vi.fn(),
  getVehicleTypeCount: vi.fn(),
}));

vi.mock('../components/charts', () => ({
  BarTrafficChart: () => <div>bar-chart</div>,
  LineTrafficChart: () => <div>line-chart</div>,
  PieTrafficChart: () => <div>pie-chart</div>,
}));

describe('Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getCountryVolume).mockReset();
    vi.mocked(getVehicleTypeCount).mockReset();
    vi.mocked(getCountryVolume).mockResolvedValue([{ country: 'BR', total: 10 }]);
    vi.mocked(getVehicleTypeCount).mockResolvedValue([{ vehicleType: 'Truck', total: 4 }]);
  });

  it('switches traffic search between country and vehicle', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Dashboard />);

    expect(await screen.findByText('bar-chart')).toBeInTheDocument();
    expect(getCountryVolume).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Vehicle Type Distribution' }));

    await waitFor(() => {
      expect(getVehicleTypeCount).toHaveBeenCalled();
    });
    expect(screen.getByText('bar-chart')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Country-wise Traffic' }));

    await waitFor(() => {
      expect(getCountryVolume.mock.calls.length).toBeGreaterThan(1);
    });
  });

  it('switches chart type through button clicks', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Dashboard />);

    expect(await screen.findByText('bar-chart')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'line' }));
    expect(await screen.findByText('line-chart')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'pie' }));
    expect(await screen.findByText('pie-chart')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'bar' }));
    expect(await screen.findByText('bar-chart')).toBeInTheDocument();
  });
});
