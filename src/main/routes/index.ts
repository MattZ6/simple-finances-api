import { Router } from 'express';
import type { Express } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { transactionRoutes } from './transaction.routes';

const routes = Router();

routes.use('/v1/auth', authenticationRoutes);
routes.use('/v1/transactions', transactionRoutes);

export function setupRoutes(app: Express) {
  app.use(routes);
}
