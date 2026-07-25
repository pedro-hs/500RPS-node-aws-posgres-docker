import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FormError } from '../components/FormError';
import { useCountries } from '../hooks/useCountries';
import { useInsertEvent } from '../hooks/useInsertEvent';
import { useVehicleTypes } from '../hooks/useVehicleTypes';

const selectClass = 'rounded-md border border-border px-2 py-1';

export default function NewEventPage() {
  const insertEvent = useInsertEvent();
  const countries = useCountries();
  const vehicleTypes = useVehicleTypes();
  const [countryId, setCountryId] = useState('');
  const [vehicleTypeId, setVehicleTypeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertEvent.mutate({
      countryId,
      vehicleTypeId: Number(vehicleTypeId),
    });
  };

  const loading = countries.isLoading || vehicleTypes.isLoading;
  const loadError = countries.isError || vehicleTypes.isError;

  return (
    <Card title="Add Event">
      {loading && <p>Loading...</p>}
      {loadError && <p className="text-red-600">Failed to load catalog.</p>}
      {!loading && !loadError && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            Country
            <select
              className={selectClass}
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select country
              </option>
              {(countries.data ?? []).map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name} ({country.id})
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            Vehicle Type
            <select
              className={selectClass}
              value={vehicleTypeId}
              onChange={(e) => setVehicleTypeId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select vehicle type
              </option>
              {(vehicleTypes.data ?? []).map((vehicleType) => (
                <option key={vehicleType.id} value={vehicleType.id}>
                  {vehicleType.name}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" disabled={insertEvent.isPending}>
            {insertEvent.isPending ? 'Saving...' : 'Add event'}
          </Button>
          {insertEvent.isSuccess && <p className="text-center text-green-600">Event added</p>}
          {insertEvent.isError && <FormError message={insertEvent.error.message} />}
        </form>
      )}
    </Card>
  );
}
