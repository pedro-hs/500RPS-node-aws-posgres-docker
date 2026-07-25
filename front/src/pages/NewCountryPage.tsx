import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FormError } from '../components/FormError';
import { useInsertCountry } from '../hooks/useInsertCountry';

export default function NewCountryPage() {
  const insertCountry = useInsertCountry();
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertCountry.mutate({ id: id.toUpperCase(), name });
  };

  return (
    <Card title="Add Country">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Country ID
          <input
            className="rounded-md border border-border px-2 py-1"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="BR"
            minLength={2}
            maxLength={2}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Name
          <input
            className="rounded-md border border-border px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brazil"
            required
          />
        </label>
        <Button type="submit" disabled={insertCountry.isPending}>
          {insertCountry.isPending ? 'Saving...' : 'Create country'}
        </Button>
        {insertCountry.isSuccess && (
          <p className="text-center text-green-600">Country created</p>
        )}
        {insertCountry.isError && <FormError message={insertCountry.error.message} />}
      </form>
    </Card>
  );
}
