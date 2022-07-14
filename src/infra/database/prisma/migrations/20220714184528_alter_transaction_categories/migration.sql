/*
  Warnings:

  - Made the column `type` on table `transaction_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transaction_categories" ALTER COLUMN "type" SET NOT NULL;
