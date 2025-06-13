-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('adresse', 'coordonnees');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('soumissionnaire', 'gestion', 'laboratoire', 'consultation');

-- CreateTable
CREATE TABLE "auth_utilisateur" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "nom_utilisateur" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "adresse_courriel" TEXT NOT NULL,
    "meta_date_verification_courriel" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "est_actif" BOOLEAN NOT NULL DEFAULT true,
    "prenom" TEXT,
    "nom" TEXT,
    "titre" TEXT,
    "organisation" TEXT,
    "division" TEXT,
    "service" TEXT,
    "no_civique" TEXT,
    "route" TEXT,
    "appartement" TEXT,
    "municipalite" TEXT,
    "province" TEXT,
    "code_postal" TEXT,
    "telephone" TEXT,
    "poste" TEXT,
    "cellulaire" TEXT,
    "telecopieur" TEXT,
    "est_admin" BOOLEAN NOT NULL DEFAULT false,
    "est_pathologiste" BOOLEAN NOT NULL DEFAULT false,
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_date_maj" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_compte" (
    "id_utilisateur" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_fournisseur" TEXT NOT NULL,
    "id_compte_fournisseur" TEXT NOT NULL,
    "jeton_renouvellement" TEXT,
    "jeton_acces" TEXT,
    "meta_date_expiration" INTEGER,
    "type_jeton" TEXT,
    "scope" TEXT,
    "id_jeton" TEXT,
    "etat_session" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_date_maj" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_compte_pkey" PRIMARY KEY ("id_fournisseur","id_compte_fournisseur")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "jeton_session" TEXT NOT NULL,
    "id_utilisateur" TEXT NOT NULL,
    "meta_date_expiration" TIMESTAMP(3) NOT NULL,
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_date_maj" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "auth_token" (
    "identifiant" TEXT NOT NULL,
    "jeton" TEXT NOT NULL,
    "meta_date_expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_token_pkey" PRIMARY KEY ("identifiant","jeton")
);

-- CreateTable
CREATE TABLE "lut_analyse_secteur" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_analyse_secteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_analyse_groupe" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "id_analyse_secteur" SMALLINT NOT NULL,

    CONSTRAINT "lut_analyse_groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_resultat_type" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_resultat_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_analyse" (
    "id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "precision" SMALLINT,
    "unite" TEXT,
    "borne_inf" DECIMAL(18,5),
    "borne_sup" DECIMAL(18,5),
    "valeur_defaut" TEXT,
    "partage" BOOLEAN NOT NULL DEFAULT false,
    "id_analyse_groupe" SMALLINT NOT NULL,
    "id_resultat_type" SMALLINT NOT NULL,

    CONSTRAINT "lut_analyse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_age" (
    "id" SMALLINT NOT NULL,
    "age" TEXT,
    "groupe" TEXT NOT NULL,
    "age_cccsf" TEXT,
    "description" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_animal_age_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_cause_mort" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "nom_cccsf" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre_affichage" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "lut_animal_cause_mort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_groupe" (
    "id" SMALLINT NOT NULL,
    "groupe" TEXT NOT NULL,

    CONSTRAINT "lut_animal_groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_groupe_v2" (
    "id" SMALLINT NOT NULL,
    "groupe" TEXT NOT NULL,
    "id_parent" SMALLINT,

    CONSTRAINT "lut_animal_groupe_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_sexe" (
    "id" SMALLINT NOT NULL,
    "sexe" TEXT NOT NULL,

    CONSTRAINT "lut_animal_sexe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_mesure_type" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "unite" TEXT,
    "groupe" TEXT NOT NULL,
    "description" TEXT,
    "id_unite_defaut" SMALLINT NOT NULL,
    "id_type_unite" SMALLINT NOT NULL,

    CONSTRAINT "lut_animal_mesure_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_unite_type" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_unite_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_decouverte_etat" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_decouverte_etat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_euthanasie_organisme" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_euthanasie_organisme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_evenement_type" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_evenement_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_signalement_provenance" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "nom_raton" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_signalement_provenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_evenement_programme" (
    "id" SMALLINT NOT NULL,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_evenement_programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_evenement_statut" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "code_mapaq" TEXT NOT NULL,

    CONSTRAINT "lut_evenement_statut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_muni" (
    "id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_mrc" SMALLINT NOT NULL,
    "nom_mrc" TEXT NOT NULL,
    "id_ra" SMALLINT NOT NULL,
    "nom_ra" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "lut_muni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_muni_geom" (
    "id" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "id_muni" INTEGER NOT NULL,
    "geom_wkt" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326),

    CONSTRAINT "lut_muni_geom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_habitat_type" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "lut_habitat_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_expedition_methode" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "lut_expedition_methode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_animal_espece" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "binome" TEXT,
    "id_groupe" INTEGER,

    CONSTRAINT "lut_animal_espece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_laboratoire" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_laboratoire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_mesure_unite" (
    "id" SMALLINT NOT NULL,
    "type" SMALLINT NOT NULL,
    "unite" TEXT,
    "facteur" DECIMAL(18,10),

    CONSTRAINT "lut_mesure_unite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_conservation_methode" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT,
    "description" TEXT,
    "id_cccsf" SMALLINT NOT NULL,
    "nom_cccsf" TEXT NOT NULL,

    CONSTRAINT "lut_conservation_methode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_euthanasie_methode" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lut_euthanasie_methode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lut_poids_unite" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "facteur_conversion" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "lut_poids_unite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_specimen_mesure" (
    "id" INTEGER NOT NULL,
    "id_specimen" INTEGER NOT NULL,
    "id_type_mesure" SMALLINT NOT NULL,
    "valeur" DECIMAL(8,3),
    "id_unite" SMALLINT NOT NULL,

    CONSTRAINT "data_specimen_mesure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_intervenant" (
    "id" SMALLINT NOT NULL,
    "nom" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "data_intervenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_decouvreur" (
    "id_evenement" INTEGER NOT NULL,
    "salutation" TEXT,
    "nom" TEXT,
    "prenom" TEXT,
    "courriel" TEXT,
    "telephone" TEXT,
    "no_civique" TEXT,
    "route" TEXT,
    "appartement" TEXT,
    "id_muni" INTEGER,
    "municipalite" TEXT,
    "province" TEXT,
    "code_postal" TEXT,
    "id_adresse_egacy" INTEGER,

    CONSTRAINT "data_decouvreur_pkey" PRIMARY KEY ("id_evenement")
);

-- CreateTable
CREATE TABLE "data_resultat" (
    "id" INTEGER NOT NULL,
    "id_specimen" INTEGER NOT NULL,
    "id_analyse" INTEGER NOT NULL,
    "valeur" TEXT NOT NULL,

    CONSTRAINT "data_resultat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_specimen" (
    "id" INTEGER NOT NULL,
    "id_evenement" INTEGER NOT NULL,
    "id_sequentiel" SMALLINT NOT NULL DEFAULT 0,
    "numero_specimen" TEXT,
    "numero_identification_silab" TEXT,
    "numero_cqsas" TEXT,
    "numero_identification_terrain" TEXT,
    "numero_pathologie" TEXT,
    "numero_permis_chasse" TEXT,
    "numero_sefaq" TEXT,
    "identifie_par" TEXT,
    "marques_identification" TEXT,
    "id_animal_espece" SMALLINT,
    "id_animal_age" SMALLINT,
    "id_animal_sexe" SMALLINT,
    "poids" DECIMAL(10,3),
    "id_poids_unite" SMALLINT,
    "id_euthanasie_methode" INTEGER,
    "date_euthanasie" DATE,
    "qtee_produit" DECIMAL(18,2),
    "no_bouteille" TEXT,
    "id_euthanasie_organisme" INTEGER,
    "id_etat_decouverte" SMALLINT,
    "id_cause_mort" SMALLINT NOT NULL DEFAULT 0,
    "id_methode_conservation" SMALLINT NOT NULL DEFAULT 0,
    "remarques" TEXT,
    "motcles" TEXT,
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_creation_par" TEXT,

    CONSTRAINT "data_specimen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_evenement" (
    "id" SERIAL NOT NULL,
    "id_type" SMALLINT NOT NULL DEFAULT 0,
    "id_provenance_signalement" INTEGER NOT NULL,
    "id_programme" INTEGER NOT NULL DEFAULT 10,
    "id_statut" SMALLINT NOT NULL DEFAULT 2,
    "id_silab" TEXT,
    "no_mapaq" TEXT,
    "no_incident_cqsas" TEXT,
    "id_soumissionnaire" TEXT NOT NULL,
    "date_decouverte" DATE,
    "decouvreur_idem_soumissionnaire" BOOLEAN NOT NULL DEFAULT false,
    "date_signalement" DATE,
    "date_recolte" DATE,
    "date_fermeture_dossier" DATE,
    "contact_humain" BOOLEAN NOT NULL DEFAULT false,
    "contact_animal" BOOLEAN NOT NULL DEFAULT false,
    "id_intervenant" SMALLINT,
    "id_type_habitat" SMALLINT,
    "id_laboratoire" INTEGER,
    "date_expedition_labo" DATE,
    "id_methode_expedition" SMALLINT,
    "no_suivi_transporteur" TEXT,
    "labo_date_reception" TIMESTAMP(3),
    "labo_recu_par" TEXT,
    "labo_id_responsable" TEXT,
    "temperature" DECIMAL(4,1),
    "observations" TEXT,
    "commentaires" TEXT,
    "motcles" TEXT,
    "numero_pathologie" TEXT,
    "affect1_espece" SMALLINT,
    "affect1_malade" SMALLINT,
    "affect1_mort" SMALLINT,
    "affect1_vivant" SMALLINT,
    "affect1_non_specifie" SMALLINT,
    "affect2_espece" SMALLINT,
    "affect2_malade" SMALLINT,
    "affect2_mort" SMALLINT,
    "affect2_vivant" SMALLINT,
    "affect2_non_specifie" SMALLINT,
    "affect3_espece" SMALLINT,
    "affect3_malade" SMALLINT,
    "affect3_mort" SMALLINT,
    "affect3_vivant" SMALLINT,
    "affect3_non_specifie" SMALLINT,
    "affect4_espece" SMALLINT,
    "affect4_malade" SMALLINT,
    "affect4_mort" SMALLINT,
    "affect4_vivant" SMALLINT,
    "affect4_non_specifie" SMALLINT,
    "affect5_espece" SMALLINT,
    "affect5_malade" SMALLINT,
    "affect5_mort" SMALLINT,
    "affect5_vivant" SMALLINT,
    "affect5_non_specifie" SMALLINT,
    "source" TEXT,
    "pk_source" INTEGER,
    "meta_date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_creation_par" TEXT,

    CONSTRAINT "data_evenement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_localisation" (
    "id_evenement" INTEGER NOT NULL,
    "description" TEXT,
    "typeId" "LocationType" NOT NULL DEFAULT 'coordonnees',
    "latitude" DECIMAL(10,6),
    "longitude" DECIMAL(10,6),
    "no_civique" TEXT,
    "route" TEXT,
    "appartement" TEXT,
    "intersection" TEXT,
    "id_muni" INTEGER,
    "municipalite" TEXT,
    "province" TEXT,
    "code_postal" TEXT,

    CONSTRAINT "data_localisation_pkey" PRIMARY KEY ("id_evenement")
);

-- CreateTable
CREATE TABLE "admin_x_utilisateur_programme" (
    "id_utilisateur" TEXT NOT NULL,
    "id_programme" INTEGER NOT NULL,
    "id_role" "AdminRole",
    "peut_soumettre" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_x_utilisateur_programme_pkey" PRIMARY KEY ("id_utilisateur","id_programme")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_utilisateur_nom_utilisateur_key" ON "auth_utilisateur"("nom_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "auth_utilisateur_adresse_courriel_key" ON "auth_utilisateur"("adresse_courriel");

-- CreateIndex
CREATE UNIQUE INDEX "auth_session_jeton_session_key" ON "auth_session"("jeton_session");

-- CreateIndex
CREATE UNIQUE INDEX "auth_token_identifiant_key" ON "auth_token"("identifiant");

-- CreateIndex
CREATE UNIQUE INDEX "auth_token_jeton_key" ON "auth_token"("jeton");

-- CreateIndex
CREATE INDEX "geomidx" ON "lut_muni_geom" USING GIST ("geom");

-- AddForeignKey
ALTER TABLE "auth_compte" ADD CONSTRAINT "auth_compte_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "auth_utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "auth_utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lut_analyse_groupe" ADD CONSTRAINT "lut_analyse_groupe_id_analyse_secteur_fkey" FOREIGN KEY ("id_analyse_secteur") REFERENCES "lut_analyse_secteur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_analyse" ADD CONSTRAINT "lut_analyse_id_analyse_groupe_fkey" FOREIGN KEY ("id_analyse_groupe") REFERENCES "lut_analyse_groupe"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_analyse" ADD CONSTRAINT "lut_analyse_id_resultat_type_fkey" FOREIGN KEY ("id_resultat_type") REFERENCES "lut_resultat_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_animal_mesure_type" ADD CONSTRAINT "lut_animal_mesure_type_id_unite_defaut_fkey" FOREIGN KEY ("id_unite_defaut") REFERENCES "lut_mesure_unite"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_animal_mesure_type" ADD CONSTRAINT "lut_animal_mesure_type_id_type_unite_fkey" FOREIGN KEY ("id_type_unite") REFERENCES "lut_unite_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "lut_muni_geom" ADD CONSTRAINT "lut_muni_geom_id_muni_fkey" FOREIGN KEY ("id_muni") REFERENCES "lut_muni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lut_animal_espece" ADD CONSTRAINT "lut_animal_espece_id_groupe_fkey" FOREIGN KEY ("id_groupe") REFERENCES "lut_animal_groupe_v2"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen_mesure" ADD CONSTRAINT "data_specimen_mesure_id_type_mesure_fkey" FOREIGN KEY ("id_type_mesure") REFERENCES "lut_animal_mesure_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen_mesure" ADD CONSTRAINT "data_specimen_mesure_id_unite_fkey" FOREIGN KEY ("id_unite") REFERENCES "lut_mesure_unite"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen_mesure" ADD CONSTRAINT "data_specimen_mesure_id_specimen_fkey" FOREIGN KEY ("id_specimen") REFERENCES "data_specimen"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_resultat" ADD CONSTRAINT "data_resultat_id_specimen_fkey" FOREIGN KEY ("id_specimen") REFERENCES "data_specimen"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_resultat" ADD CONSTRAINT "data_resultat_id_analyse_fkey" FOREIGN KEY ("id_analyse") REFERENCES "lut_analyse"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_euthanasie_methode_fkey" FOREIGN KEY ("id_euthanasie_methode") REFERENCES "lut_euthanasie_methode"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_euthanasie_organisme_fkey" FOREIGN KEY ("id_euthanasie_organisme") REFERENCES "lut_euthanasie_organisme"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_evenement_fkey" FOREIGN KEY ("id_evenement") REFERENCES "data_evenement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_animal_espece_fkey" FOREIGN KEY ("id_animal_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_animal_age_fkey" FOREIGN KEY ("id_animal_age") REFERENCES "lut_animal_age"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_animal_sexe_fkey" FOREIGN KEY ("id_animal_sexe") REFERENCES "lut_animal_sexe"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_poids_unite_fkey" FOREIGN KEY ("id_poids_unite") REFERENCES "lut_poids_unite"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_etat_decouverte_fkey" FOREIGN KEY ("id_etat_decouverte") REFERENCES "lut_decouverte_etat"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_cause_mort_fkey" FOREIGN KEY ("id_cause_mort") REFERENCES "lut_animal_cause_mort"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_specimen" ADD CONSTRAINT "data_specimen_id_methode_conservation_fkey" FOREIGN KEY ("id_methode_conservation") REFERENCES "lut_conservation_methode"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "lut_evenement_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_provenance_signalement_fkey" FOREIGN KEY ("id_provenance_signalement") REFERENCES "lut_signalement_provenance"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_programme_fkey" FOREIGN KEY ("id_programme") REFERENCES "lut_evenement_programme"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_statut_fkey" FOREIGN KEY ("id_statut") REFERENCES "lut_evenement_statut"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_soumissionnaire_fkey" FOREIGN KEY ("id_soumissionnaire") REFERENCES "auth_utilisateur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_intervenant_fkey" FOREIGN KEY ("id_intervenant") REFERENCES "data_intervenant"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_type_habitat_fkey" FOREIGN KEY ("id_type_habitat") REFERENCES "lut_habitat_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_methode_expedition_fkey" FOREIGN KEY ("id_methode_expedition") REFERENCES "lut_expedition_methode"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_affect1_espece_fkey" FOREIGN KEY ("affect1_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_affect2_espece_fkey" FOREIGN KEY ("affect2_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_affect3_espece_fkey" FOREIGN KEY ("affect3_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_affect4_espece_fkey" FOREIGN KEY ("affect4_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_affect5_espece_fkey" FOREIGN KEY ("affect5_espece") REFERENCES "lut_animal_espece"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_meta_creation_par_fkey" FOREIGN KEY ("meta_creation_par") REFERENCES "auth_utilisateur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_id_laboratoire_fkey" FOREIGN KEY ("id_laboratoire") REFERENCES "lut_laboratoire"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_evenement" ADD CONSTRAINT "data_evenement_labo_id_responsable_fkey" FOREIGN KEY ("labo_id_responsable") REFERENCES "auth_utilisateur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_localisation" ADD CONSTRAINT "data_localisation_id_muni_fkey" FOREIGN KEY ("id_muni") REFERENCES "lut_muni"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "data_localisation" ADD CONSTRAINT "data_localisation_id_evenement_fkey" FOREIGN KEY ("id_evenement") REFERENCES "data_evenement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_x_utilisateur_programme" ADD CONSTRAINT "admin_x_utilisateur_programme_id_programme_fkey" FOREIGN KEY ("id_programme") REFERENCES "lut_evenement_programme"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "admin_x_utilisateur_programme" ADD CONSTRAINT "admin_x_utilisateur_programme_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "auth_utilisateur"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
