export interface ITrafficEvent {
  id: number;
  countryId: string;
  vehicleTypeId: number;
  occurredAt: Date;
}

export interface ITrafficEventRequest extends Omit<ITrafficEvent, 'id' | 'occurredAt'> {}

export interface ITrafficService {
  getCountryTrafficVolume(): Promise<unknown[]>;
  getVehicleTypeCount(): Promise<unknown[]>;
  insertTrafficEvent(event: ITrafficEventRequest): Promise<unknown>;
}
