export type EnumTransactionType = 'INCOME' | 'OUTCOME';

export type Transaction = {
  id: string;
  user_id: string;
  title: string;
  value: number;
  date: Date;
  type: EnumTransactionType;
  created_at: Date;
  updated_at: Date;
};
