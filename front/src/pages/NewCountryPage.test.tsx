import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { insertCountry } from '../api/catalog';
import { renderWithProviders } from '../test/render';
import NewCountryPage from './NewCountryPage';

vi.mock('../api/catalog', () => ({
  insertCountry: vi.fn(),
}));

describe('NewCountryPage', () => {
  beforeEach(() => {
    vi.mocked(insertCountry).mockReset();
  });

  it('creates a country through the form', async () => {
    const user = userEvent.setup();
    vi.mocked(insertCountry).mockResolvedValue({ id: 'BR', name: 'Brazil' });

    renderWithProviders(<NewCountryPage />);

    await user.type(screen.getByPlaceholderText('BR'), 'br');
    await user.type(screen.getByPlaceholderText('Brazil'), 'Brazil');
    await user.click(screen.getByRole('button', { name: 'Create country' }));

    await waitFor(() => {
      expect(insertCountry).toHaveBeenCalledWith({ id: 'BR', name: 'Brazil' });
    });
    expect(await screen.findByText('Country created')).toBeInTheDocument();
  });
});
