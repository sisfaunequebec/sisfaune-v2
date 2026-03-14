-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_meta_creation_par_fkey" FOREIGN KEY ("meta_creation_par") REFERENCES "auth_utilisateur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
