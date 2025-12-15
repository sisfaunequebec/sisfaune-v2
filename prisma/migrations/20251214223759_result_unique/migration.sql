/*
  Warnings:

  - A unique constraint covering the columns `[id_specimen,id_analyse]` on the table `data_resultat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "data_resultat_id_specimen_id_analyse_key" ON "data_resultat"("id_specimen", "id_analyse");
