import { EnumTransactionType } from './Transaction';

export type TransactionCategory = {
  id: string;
  title: string;
  description: string;
  type: EnumTransactionType;
  slug: string;
  created_at: Date;
  updated_at: Date;
};
