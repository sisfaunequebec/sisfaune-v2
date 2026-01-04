-- CreateTable
CREATE TABLE "lut_resultat_code_valeur" (
    "id" SMALLSERIAL NOT NULL,
    "id_analyse" SMALLINT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre_affichage" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "lut_resultat_code_valeur_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lut_resultat_code_valeur" ADD CONSTRAINT "lut_resultat_code_valeur_id_analyse_fkey" FOREIGN KEY ("id_analyse") REFERENCES "lut_analyse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
