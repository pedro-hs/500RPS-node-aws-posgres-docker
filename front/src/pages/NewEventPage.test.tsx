import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listCountries, listVehicleTypes } from '../api/catalog';
import { insertEvent } from '../api/traffic';
import { renderWithProviders } from '../test/render';
import NewEventPage from './NewEventPage';

vi.mock('../api/catalog', () => ({
  listCountries: vi.fn(),
  listVehicleTypes: vi.fn(),
}));

vi.mock('../api/traffic', () => ({
  insertEvent: vi.fn(),
}));

describe('NewEventPage', () => {
  beforeEach(() => {
    vi.mocked(listCountries).mockReset();
    vi.mocked(listVehicleTypes).mockReset();
    vi.mocked(insertEvent).mockReset();
  });

  it('adds an event through the form', async () => {
    const user = userEvent.setup();
    vi.mocked(listCountries).mockResolvedValue([{ id: 'BR', name: 'Brazil' }]);
    vi.mocked(listVehicleTypes).mockResolvedValue([{ id: 2, name: 'Truck' }]);
    vi.mocked(insertEvent).mockResolvedValue(undefined);

    renderWithProviders(<NewEventPage />);

    await user.selectOptions(await screen.findByLabelText('Country'), 'BR');
    await user.selectOptions(screen.getByLabelText('Vehicle Type'), '2');
    await user.click(screen.getByRole('button', { name: 'Add event' }));

    await waitFor(() => {
      expect(insertEvent.mock.calls[0]?.[0]).toEqual({
        countryId: 'BR',
        vehicleTypeId: 2,
      });
    });
    expect(await screen.findByText('Event added')).toBeInTheDocument();
  });
});
