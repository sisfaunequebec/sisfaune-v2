/*
  Warnings:

  - You are about to drop the column `id_groupe` on the `lut_animal_mesure_type` table. All the data in the column will be lost.
  - You are about to drop the column `unite` on the `lut_animal_mesure_type` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `lut_mesure_unite` table. All the data in the column will be lost.
  - You are about to drop the `lut_unite_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_animal_groupe` to the `lut_animal_mesure_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_type` to the `lut_mesure_unite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lut_animal_mesure_type" DROP CONSTRAINT "lut_animal_mesure_type_id_type_unite_fkey";

-- DropForeignKey
ALTER TABLE "lut_animal_mesure_type" DROP CONSTRAINT "lut_animal_mesure_type_id_unite_defaut_fkey";

-- AlterTable
ALTER TABLE "lut_animal_mesure_type" DROP COLUMN "id_groupe",
DROP COLUMN "unite",
ADD COLUMN     "id_animal_groupe" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lut_mesure_unite" DROP COLUMN "type",
ADD COLUMN     "id_type" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "lut_unite_type";
