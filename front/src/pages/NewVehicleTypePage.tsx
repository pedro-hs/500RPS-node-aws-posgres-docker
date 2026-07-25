import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FormError } from '../components/FormError';
import { useInsertVehicleType } from '../hooks/useInsertVehicleType';

export default function NewVehicleTypePage() {
  const insertVehicleType = useInsertVehicleType();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertVehicleType.mutate({ name });
  };

  return (
    <Card title="Add Vehicle Type">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Name
          <input
            className="rounded-md border border-border px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Truck"
            required
          />
        </label>
        <Button type="submit" disabled={insertVehicleType.isPending}>
          {insertVehicleType.isPending ? 'Saving...' : 'Create vehicle type'}
        </Button>
        {insertVehicleType.isSuccess && (
          <p className="text-center text-green-600">Vehicle type created</p>
        )}
        {insertVehicleType.isError && <FormError message={insertVehicleType.error.message} />}
      </form>
    </Card>
  );
}
