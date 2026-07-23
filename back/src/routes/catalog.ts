import { FastifyInstance } from 'fastify';
import { CatalogControllerFactory } from '../factories/catalog-controller';
import { insertCountrySchema, insertVehicleTypeSchema } from './schemas/catalog';

export async function catalogRoutes(app: FastifyInstance) {
  const controller = CatalogControllerFactory.create();

  app.get('/countries', controller.listCountries);
  app.get('/vehicle-types', controller.listVehicleTypes);
  app.post('/countries', { schema: insertCountrySchema }, controller.insertCountry);
  app.post('/vehicle-types', { schema: insertVehicleTypeSchema }, controller.insertVehicleType);
}

export default catalogRoutes;
