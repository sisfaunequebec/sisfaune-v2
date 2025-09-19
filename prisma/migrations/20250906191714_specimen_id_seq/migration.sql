-- AlterTable
CREATE SEQUENCE data_specimen_id_seq;
ALTER TABLE "data_specimen" ALTER COLUMN "id" SET DEFAULT nextval('data_specimen_id_seq');
ALTER SEQUENCE data_specimen_id_seq OWNED BY "data_specimen"."id";


