/*
  Warnings:

  - Made the column `id_animal_espece` on table `data_specimen` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "data_specimen" ALTER COLUMN "id_animal_espece" SET NOT NULL;
