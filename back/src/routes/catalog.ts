import { FastifyInstance } from 'fastify';
import { CatalogControllerFactory } from '../factories/catalog-controller';
import { insertCountrySchema, insertVehicleTypeSchema } from './schemas/catalog';

export async function catalogRoutes(app: FastifyInstance) {
  const controller = CatalogControllerFactory.create();

  app.post('/countries', { schema: insertCountrySchema }, controller.insertCountry);
  app.post('/vehicles-types', { schema: insertVehicleTypeSchema }, controller.insertVehicleType);
}

export default catalogRoutes;
