/*
  Warnings:

  - You are about to drop the column `groupe` on the `lut_animal_mesure_type` table. All the data in the column will be lost.
  - Added the required column `id_groupe` to the `lut_animal_mesure_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE data_specimen_mesure_id_seq;
ALTER TABLE "data_specimen_mesure" ALTER COLUMN "id" SET DEFAULT nextval('data_specimen_mesure_id_seq');
ALTER SEQUENCE data_specimen_mesure_id_seq OWNED BY "data_specimen_mesure"."id";

-- AlterTable
ALTER TABLE "lut_animal_mesure_type" DROP COLUMN "groupe",
ADD COLUMN     "id_groupe" INTEGER NOT NULL;
