export interface ITrafficEvent {
  id: number;
  countryId: string;
  vehicleTypeId: number;
  occurredAt: Date;
}

export type ITrafficEventRequest = Omit<ITrafficEvent, 'id' | 'occurredAt'>;

export interface ICountryTrafficVolume {
  country: string;
  total: number;
}

export interface IVehicleTypeCount {
  vehicleType: string;
  total: number;
}

export interface ITrafficService {
  getCountryTrafficVolume(): Promise<ICountryTrafficVolume[]>;
  getVehicleTypeCount(): Promise<IVehicleTypeCount[]>;
  insertTrafficEvent(event: ITrafficEventRequest): Promise<ITrafficEvent>;
}
