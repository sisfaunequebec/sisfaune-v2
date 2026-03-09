-- AlterTable
ALTER TABLE "admin_tache" ADD COLUMN     "parametres" JSONB,
ADD COLUMN     "resultat" JSONB,
ADD COLUMN     "vu" BOOLEAN NOT NULL DEFAULT false;
