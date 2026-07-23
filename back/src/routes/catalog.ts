import { FastifyInstance } from 'fastify';
import { CatalogControllerFactory } from '../factories/catalog-controller';

export async function catalogRoutes(app: FastifyInstance) {
  const controller = CatalogControllerFactory.create();

  app.get('/countries', controller.insertCountry);
  app.get('/vehicles-types', controller.insertVehicleType);
}

export default catalogRoutes;
