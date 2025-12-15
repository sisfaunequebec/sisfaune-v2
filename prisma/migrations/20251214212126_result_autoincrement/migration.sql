-- AlterTable
CREATE SEQUENCE data_resultat_id_seq;
ALTER TABLE "data_resultat" ALTER COLUMN "id" SET DEFAULT nextval('data_resultat_id_seq');
ALTER SEQUENCE data_resultat_id_seq OWNED BY "data_resultat"."id";
