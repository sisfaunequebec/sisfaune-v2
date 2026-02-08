-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('en_cours', 'termine', 'erreur');

-- CreateTable
CREATE TABLE "admin_tache" (
    "id_tache" SERIAL NOT NULL,
    "id_utilisateur" TEXT NOT NULL,
    "id_session" TEXT NOT NULL,
    "etat" "TaskStatus" NOT NULL DEFAULT 'en_cours',
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_date_maj" TIMESTAMP(3),

    CONSTRAINT "admin_tache_pkey" PRIMARY KEY ("id_tache")
);
