import { Router } from 'express';
import type { Express } from 'express';

import { authenticationRoutes } from './authentication.routes';

const routes = Router();

routes.use('/v1/auth', authenticationRoutes);

export function setupRoutes(app: Express) {
  app.use(routes);
}
