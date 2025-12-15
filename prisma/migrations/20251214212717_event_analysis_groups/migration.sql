-- CreateTable
CREATE TABLE "x_evenement_groupeanalyse" (
    "id_evenement" INTEGER NOT NULL,
    "id_groupe_analyse" INTEGER NOT NULL,

    CONSTRAINT "x_evenement_groupeanalyse_pkey" PRIMARY KEY ("id_evenement","id_groupe_analyse")
);

-- AddForeignKey
ALTER TABLE "x_evenement_groupeanalyse" ADD CONSTRAINT "x_evenement_groupeanalyse_id_evenement_fkey" FOREIGN KEY ("id_evenement") REFERENCES "data_evenement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "x_evenement_groupeanalyse" ADD CONSTRAINT "x_evenement_groupeanalyse_id_groupe_analyse_fkey" FOREIGN KEY ("id_groupe_analyse") REFERENCES "lut_analyse_groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
