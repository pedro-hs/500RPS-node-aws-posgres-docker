import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ERROR_MESSAGES } from '../constants/errors';
import { useInsertEvent } from '../hooks/useInsertEvent';

export default function NewEventPage() {
  const insertEvent = useInsertEvent();
  const [countryId, setCountryId] = useState('');
  const [vehicleTypeId, setVehicleTypeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertEvent.mutate({
      countryId,
      vehicleTypeId: Number(vehicleTypeId),
    });
  };

  return (
    <Card title="Add Event">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Country ID
          <input
            className="rounded-md border border-border px-2 py-1"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            placeholder="BR"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Vehicle Type ID
          <input
            className="rounded-md border border-border px-2 py-1"
            type="number"
            value={vehicleTypeId}
            onChange={(e) => setVehicleTypeId(e.target.value)}
            placeholder="1"
            required
          />
        </label>
        <Button type="submit" disabled={insertEvent.isPending}>
          {insertEvent.isPending ? 'Saving...' : 'Add event'}
        </Button>
        {insertEvent.isSuccess && <p>Event added.</p>}
        {insertEvent.isError && (
          <p className="text-red-600">
            {ERROR_MESSAGES[insertEvent.error.message] ?? insertEvent.error.message}
          </p>
        )}
      </form>
    </Card>
  );
}
