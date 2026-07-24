import { describe, it, expect, vi } from 'vitest';
import { TrafficService } from '../../src/services/traffic';
import { CacheService } from '../../src/services/cache';

describe('TrafficService', () => {
  const expectMethodIsCached = async (
    method: 'getCountryTrafficVolume' | 'getVehicleTypeCount',
    result: unknown[],
  ) => {
    const repository = { [method]: vi.fn() } as any;
    const service = new TrafficService(repository, new CacheService(60, true));
    repository[method].mockResolvedValue(result);

    await service[method]();
    await service[method]();

    expect(repository[method]).toHaveBeenCalledTimes(1);
  };

  it('caches getCountryTrafficVolume after the first call', () =>
    expectMethodIsCached('getCountryTrafficVolume', [{ country: 'BR', total: 10 }]));

  it('caches getVehicleTypeCount after the first call', () =>
    expectMethodIsCached('getVehicleTypeCount', [{ vehicleType: 'Truck', total: 5 }]));

  it('invalidates cached data when a traffic event is inserted', async () => {
    const repository = { getCountryTrafficVolume: vi.fn(), insertTrafficEvent: vi.fn() } as any;
    const service = new TrafficService(repository, new CacheService(60, true));
    const volume = [{ country: 'BR', total: 10 }];
    repository.getCountryTrafficVolume.mockResolvedValue(volume);
    repository.insertTrafficEvent.mockResolvedValue({
      id: 1,
      countryId: 'BR',
      vehicleTypeId: 1,
      occurredAt: new Date(),
    });

    await service.getCountryTrafficVolume();
    await service.insertTrafficEvent({ countryId: 'BR', vehicleTypeId: 1 });
    await service.getCountryTrafficVolume();

    expect(repository.getCountryTrafficVolume).toHaveBeenCalledTimes(2);
  });
});
