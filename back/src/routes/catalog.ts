import { FastifyInstance } from 'fastify';
import { CatalogControllerFactory } from '../factories/catalog-controller';

export async function catalogRoutes(app: FastifyInstance) {
  const controller = CatalogControllerFactory.create();

  app.post('/countries', {}, controller.insertCountry);
  app.post('/vehicles-types', {}, controller.insertVehicleType);
}

export default catalogRoutes;
