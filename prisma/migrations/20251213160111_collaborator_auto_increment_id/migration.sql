-- AlterTable
CREATE SEQUENCE data_intervenant_id_seq;
ALTER TABLE "data_intervenant" ALTER COLUMN "id" SET DEFAULT nextval('data_intervenant_id_seq');
ALTER SEQUENCE data_intervenant_id_seq OWNED BY "data_intervenant"."id";

-- AddForeignKey
ALTER TABLE "data_decouvreur" ADD CONSTRAINT "data_decouvreur_id_evenement_fkey" FOREIGN KEY ("id_evenement") REFERENCES "data_evenement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_decouvreur" ADD CONSTRAINT "data_decouvreur_id_muni_fkey" FOREIGN KEY ("id_muni") REFERENCES "lut_muni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
