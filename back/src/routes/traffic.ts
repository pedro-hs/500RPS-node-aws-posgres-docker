import { FastifyInstance } from 'fastify';
import { TrafficControllerFactory } from '../factories/traffic-controller';

export async function trafficRoutes(app: FastifyInstance) {
  const controller = TrafficControllerFactory.create();

  app.get('/countries/volume', controller.getCountryTrafficVolume);
  app.get('/vehicles-type/count', controller.getVehicleTypeCount);
  app.post('/events', { }, controller.insertTrafficEvent);
}

export default trafficRoutes;
