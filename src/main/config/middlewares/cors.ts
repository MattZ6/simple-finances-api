import cors from 'cors';
import type { Express } from 'express';

import { appConfig } from '../env';

export function setupCors(app: Express) {
  /**
   * Its important to add the origin param to cors configuration.
   */

  app.use(
    cors({
      origin: appConfig.SITE_URL,
    })
  );
}
