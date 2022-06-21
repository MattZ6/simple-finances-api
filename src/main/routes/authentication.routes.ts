import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express';
import {
  makeAuthenticateUserWithGoogleController,
  makeRefreshUserAccessTokenController,
} from '@main/factories/controllers/user';

export const authenticationRoutes = Router();

authenticationRoutes.post(
  '/google',
  adaptRoute(makeAuthenticateUserWithGoogleController())
);

authenticationRoutes.post(
  '/refresh',
  adaptRoute(makeRefreshUserAccessTokenController())
);
