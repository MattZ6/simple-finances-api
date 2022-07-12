import { Router } from 'express';
import type { Express } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { transactionRoutes } from './transaction.routes';
import { transactionCategoryRoutes } from './transactionCategory.routes';

const routes = Router();

routes.use('/v1/auth', authenticationRoutes);
routes.use('/v1/transactions', transactionRoutes);
routes.use('/v1/transactions/categories', transactionCategoryRoutes);

export function setupRoutes(app: Express) {
  app.use(routes);
}
