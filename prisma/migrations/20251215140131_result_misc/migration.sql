/*
  Warnings:

  - The primary key for the `x_evenement_groupeanalyse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_groupe_analyse` on the `x_evenement_groupeanalyse` table. All the data in the column will be lost.
  - Added the required column `id_analyse_groupe` to the `x_evenement_groupeanalyse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "data_resultat" DROP CONSTRAINT "data_resultat_id_analyse_fkey";

-- DropForeignKey
ALTER TABLE "data_resultat" DROP CONSTRAINT "data_resultat_id_specimen_fkey";

-- DropForeignKey
ALTER TABLE "x_evenement_groupeanalyse" DROP CONSTRAINT "x_evenement_groupeanalyse_id_groupe_analyse_fkey";

-- AlterTable
ALTER TABLE "x_evenement_groupeanalyse" DROP CONSTRAINT "x_evenement_groupeanalyse_pkey",
DROP COLUMN "id_groupe_analyse",
ADD COLUMN     "id_analyse_groupe" INTEGER NOT NULL,
ADD CONSTRAINT "x_evenement_groupeanalyse_pkey" PRIMARY KEY ("id_evenement", "id_analyse_groupe");

-- AddForeignKey
ALTER TABLE "data_resultat" ADD CONSTRAINT "data_resultat_id_specimen_fkey" FOREIGN KEY ("id_specimen") REFERENCES "data_specimen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_resultat" ADD CONSTRAINT "data_resultat_id_analyse_fkey" FOREIGN KEY ("id_analyse") REFERENCES "lut_analyse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "x_evenement_groupeanalyse" ADD CONSTRAINT "x_evenement_groupeanalyse_id_analyse_groupe_fkey" FOREIGN KEY ("id_analyse_groupe") REFERENCES "lut_analyse_groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
