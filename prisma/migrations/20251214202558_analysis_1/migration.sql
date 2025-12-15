-- AlterTable
CREATE SEQUENCE lut_analyse_id_seq;
ALTER TABLE "lut_analyse" ALTER COLUMN "id" SET DEFAULT nextval('lut_analyse_id_seq');
ALTER SEQUENCE lut_analyse_id_seq OWNED BY "lut_analyse"."id";

-- AlterTable
CREATE SEQUENCE lut_analyse_groupe_id_seq;
ALTER TABLE "lut_analyse_groupe" ALTER COLUMN "id" SET DEFAULT nextval('lut_analyse_groupe_id_seq');
ALTER SEQUENCE lut_analyse_groupe_id_seq OWNED BY "lut_analyse_groupe"."id";

-- CreateTable
CREATE TABLE "lut_type_resultat_code" (
    "id" SMALLINT NOT NULL,
    "id_type_resultat" SMALLINT NOT NULL,

    CONSTRAINT "lut_type_resultat_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_type_resultat_plage" (
    "id" SMALLINT NOT NULL,
    "id_type_resultat" SMALLINT NOT NULL,
    "precision" SMALLINT NOT NULL DEFAULT 0,
    "unite" TEXT,
    "borne_inf" DECIMAL(18,5),
    "borne_sup" DECIMAL(18,5),
    "valeur_defaut" TEXT,

    CONSTRAINT "lut_type_resultat_plage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_type_resultat_texte" (
    "id" SMALLINT NOT NULL,
    "id_type_resultat" SMALLINT NOT NULL,

    CONSTRAINT "lut_type_resultat_texte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lut_type_resultat_code" ADD CONSTRAINT "lut_type_resultat_code_id_type_resultat_fkey" FOREIGN KEY ("id_type_resultat") REFERENCES "lut_resultat_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_type_resultat_plage" ADD CONSTRAINT "lut_type_resultat_plage_id_type_resultat_fkey" FOREIGN KEY ("id_type_resultat") REFERENCES "lut_resultat_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_type_resultat_texte" ADD CONSTRAINT "lut_type_resultat_texte_id_type_resultat_fkey" FOREIGN KEY ("id_type_resultat") REFERENCES "lut_resultat_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
