import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { insertVehicleType } from '../api/catalog';
import { renderWithProviders } from '../test/render';
import NewVehicleTypePage from './NewVehicleTypePage';

vi.mock('../api/catalog', () => ({
  insertVehicleType: vi.fn(),
}));

describe('NewVehicleTypePage', () => {
  beforeEach(() => {
    vi.mocked(insertVehicleType).mockReset();
  });

  it('creates a vehicle type through the form', async () => {
    const user = userEvent.setup();
    vi.mocked(insertVehicleType).mockResolvedValue({ id: 1, name: 'Truck' });

    renderWithProviders(<NewVehicleTypePage />);

    await user.type(screen.getByPlaceholderText('Truck'), 'Truck');
    await user.click(screen.getByRole('button', { name: 'Create vehicle type' }));

    await waitFor(() => {
      expect(insertVehicleType.mock.calls[0]?.[0]).toEqual({ name: 'Truck' });
    });
    expect(await screen.findByText('Vehicle type created')).toBeInTheDocument();
  });
});
