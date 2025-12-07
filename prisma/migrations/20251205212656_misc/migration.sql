/*
  Warnings:

  - You are about to drop the column `groupe` on the `lut_animal_age` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mot_de_passe]` on the table `auth_utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_groupe` to the `lut_animal_age` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth_utilisateur" ALTER COLUMN "meta_date_verification_courriel" DROP DEFAULT;

-- AlterTable
ALTER TABLE "data_specimen" ALTER COLUMN "id_animal_espece" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lut_animal_age" DROP COLUMN "groupe",
ADD COLUMN     "id_groupe" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_utilisateur_mot_de_passe_key" ON "auth_utilisateur"("mot_de_passe");

-- AddForeignKey
ALTER TABLE "lut_animal_age" ADD CONSTRAINT "lut_animal_age_id_groupe_fkey" FOREIGN KEY ("id_groupe") REFERENCES "lut_animal_groupe_v2"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
