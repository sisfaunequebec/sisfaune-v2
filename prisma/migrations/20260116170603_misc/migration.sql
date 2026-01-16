/*
  Warnings:

  - You are about to drop the `lut_type_resultat_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lut_type_resultat_plage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lut_type_resultat_texte` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin_x_utilisateur_programme" DROP CONSTRAINT "admin_x_utilisateur_programme_id_programme_fkey";

-- DropForeignKey
ALTER TABLE "admin_x_utilisateur_programme" DROP CONSTRAINT "admin_x_utilisateur_programme_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "lut_type_resultat_code" DROP CONSTRAINT "lut_type_resultat_code_id_type_resultat_fkey";

-- DropForeignKey
ALTER TABLE "lut_type_resultat_plage" DROP CONSTRAINT "lut_type_resultat_plage_id_type_resultat_fkey";

-- DropForeignKey
ALTER TABLE "lut_type_resultat_texte" DROP CONSTRAINT "lut_type_resultat_texte_id_type_resultat_fkey";

-- DropTable
DROP TABLE "lut_type_resultat_code";

-- DropTable
DROP TABLE "lut_type_resultat_plage";

-- DropTable
DROP TABLE "lut_type_resultat_texte";

-- AddForeignKey
ALTER TABLE "admin_x_utilisateur_programme" ADD CONSTRAINT "admin_x_utilisateur_programme_id_programme_fkey" FOREIGN KEY ("id_programme") REFERENCES "lut_evenement_programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_x_utilisateur_programme" ADD CONSTRAINT "admin_x_utilisateur_programme_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "auth_utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
