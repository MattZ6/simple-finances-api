import { Router } from 'express';

import { adaptMiddleware, adaptRoute } from '@main/adapters/express';
import { makeListAllTransactionCategoriesController } from '@main/factories/controllers/transaction';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

export const transactionCategoryRoutes = Router();

transactionCategoryRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListAllTransactionCategoriesController())
);
