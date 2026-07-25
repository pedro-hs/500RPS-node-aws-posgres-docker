import { useState } from 'react';
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
    <div>
      <h1 className="mb-4 text-xl font-semibold">Add Event</h1>
      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
        <label className="flex flex-col gap-1">
          Country ID
          <input
            className="border px-2 py-1"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            placeholder="BR"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Vehicle Type ID
          <input
            className="border px-2 py-1"
            type="number"
            value={vehicleTypeId}
            onChange={(e) => setVehicleTypeId(e.target.value)}
            placeholder="1"
            required
          />
        </label>
        <button
          type="submit"
          disabled={insertEvent.isPending}
          className="border bg-white px-3 py-2 disabled:opacity-50"
        >
          {insertEvent.isPending ? 'Saving...' : 'Add event'}
        </button>
        {insertEvent.isSuccess && <p>Event added.</p>}
        {insertEvent.isError && <p>Failed to add event.</p>}
      </form>
    </div>
  );
}
