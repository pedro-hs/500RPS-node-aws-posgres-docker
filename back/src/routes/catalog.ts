import { FastifyInstance } from 'fastify';
import { CatalogControllerFactory } from '../factories/catalog-controller';

export async function catalogRoutes(app: FastifyInstance) {
  const controller = CatalogControllerFactory.create();

  app.get('/countries', controller.getCountryCatalogVolume);
  app.get('/vehicles-types', controller.getVehicleTypeCount);
}

export default catalogRoutes;
