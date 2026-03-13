-- DropIndex
DROP INDEX "auth_utilisateur_mot_de_passe_key";

-- AlterTable
ALTER TABLE "auth_utilisateur" ADD COLUMN     "legacy_password_hash" TEXT,
ADD COLUMN     "legacy_password_salt" TEXT,
ALTER COLUMN "mot_de_passe" DROP NOT NULL;
