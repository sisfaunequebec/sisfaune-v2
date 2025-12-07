-- DropForeignKey
ALTER TABLE "data_specimen_mesure" DROP CONSTRAINT "data_specimen_mesure_id_specimen_fkey";

-- AddForeignKey
ALTER TABLE "data_specimen_mesure" ADD CONSTRAINT "data_specimen_mesure_id_specimen_fkey" FOREIGN KEY ("id_specimen") REFERENCES "data_specimen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
