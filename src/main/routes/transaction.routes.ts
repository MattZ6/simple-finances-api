import { Router } from 'express';

import { adaptMiddleware, adaptRoute } from '@main/adapters/express';
import { makeListAllMonthsByUserController } from '@main/factories/controllers/transaction';
import { makeCreateTransactionController } from '@main/factories/controllers/transaction/Create';
import { makeGetBalanceByUserController } from '@main/factories/controllers/transaction/GetBalanceByUser';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

export const transactionRoutes = Router();

transactionRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateTransactionController())
);

transactionRoutes.get(
  '/months',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListAllMonthsByUserController())
);

transactionRoutes.get(
  '/balance',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetBalanceByUserController())
);
