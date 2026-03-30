/*
  Warnings:

  - The primary key for the `admin_tache` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vu` on the `admin_tache` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin_tache" DROP CONSTRAINT "admin_tache_pkey",
DROP COLUMN "vu",
ALTER COLUMN "id_tache" DROP DEFAULT,
ALTER COLUMN "id_tache" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_tache_pkey" PRIMARY KEY ("id_tache");
DROP SEQUENCE "admin_tache_id_tache_seq";
