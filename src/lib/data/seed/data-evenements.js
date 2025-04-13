const source = require('./sources/evenement.json')

const stringOrNull = (str) => {
  const trimmed = str.trim()
  return trimmed.length ? trimmed : null
}

const stringToBool = (str) => {
  return str.trim() === '1'
}

const transformed = source.map(p => {
  const { 
    id_evenement,
    id_type,

    id_provenance_signalement,
    id_programme,
    id_statut,
    id_silab,
    no_mapaq,
    no_incident_cqsas,

    id_decouvreur,
    date_decouverte,

    date_signalement,
    date_recolte,
    date_fermeture_dossier,

    decouvreur_idem_soumissionnaire,

    contact_humain,
    contact_animal,

    id_type_habitat,

    date_expedition_labo,
    id_methode_expedition,
    no_suivi_transporteur,
    temperature,
    observations,
    comments,
    keywords,
    numero_pathologie
  } = p

  return {
    id: parseInt(id_evenement, 10),
    typeId: parseInt(id_type, 10),

    reportOriginId: parseInt(id_provenance_signalement, 10),

    programId: parseInt(id_programme, 10),

    statusId: parseInt(id_statut, 10),

    silabId: stringOrNull(id_silab),
    mapaqId: stringOrNull(no_mapaq),
    cqsasIncidentNumber: stringOrNull(no_incident_cqsas),

    // TODO: discovererId
    discoveredAt: stringOrNull(date_decouverte),

    reportedAt: stringOrNull(date_signalement),
    collectedAt: stringOrNull(date_recolte),
    closedAt: stringOrNull(date_fermeture_dossier),

    // TODO: submitterId
    isDiscovererSameAsSubmitter: stringToBool(decouvreur_idem_soumissionnaire),

    hadHumanContact: stringToBool(contact_humain),
    hadAnimalContact: stringToBool(contact_animal),

    // TODO: collaboratorId

    habitatTypeId: parseInt(id_type_habitat, 10),

    // TODO: labId
    labShippingDate: stringOrNull(date_expedition_labo),
    labShippingMethodId: parseInt(id_methode_expedition, 10),
    labShippingTrackingNumber: stringOrNull(no_suivi_transporteur),

    temperature: parseFloat(temperature),
    observations: stringOrNull(observations),
    comments: stringOrNull(comments),
    keywords: stringOrNull(keywords),

    pathologyNumber: stringOrNull(numero_pathologie),

    // typeId: nom.trim().replaceAll("''", "'")
  }
})

module.exports = transformed

// "id_evenement": 1004,
// "id_type": "0",
// "id_programme": 4,
// "id_statut": "3",
// "id_silab": null,
// "no_incident_cqsas": null,
// "date_decouverte": "2009-01-12 00:00:00",
// "decouvreur_idem_soumissionnaire": "0",
// "id_decouvreur": null,
// "contact_humain": "0",
// "contact_animal_dom": "0",
// "date_signalement": "2009-01-12 00:00:00",
// "no_mapaq": "R0900012553",
// "id_soumissionnaire": "1beb8181-3e91-486b-9b2f-9ea8b6bbdce5",
// "id_provenance_signalement": 9,
// "date_recolte": "2009-01-13 00:00:00",
// "id_intervenant": "0",
// "id_type_habitat": "0",
// "temperature": null,
// "observations": "Signe neurologiques",
// "commentaires": null,
// "date_expedition_labo": null,
// "id_laboratoire": 1,
// "id_methode_expedition": "0",
// "no_suivi_transporteur": null,
// "motcles": null,
// "numero_pathologie": null,
// "affect1_espece": "777",
// "affect1_malade": null,
// "affect1_mort": "1",
// "affect1_vivant": null,
// "affect1_non_specifie": null,
// "affect2_espece": null,
// "affect2_malade": null,
// "affect2_mort": null,
// "affect2_vivant": null,
// "affect2_non_specifie": null,
// "affect3_espece": null,
// "affect3_malade": null,
// "affect3_mort": null,
// "affect3_vivant": null,
// "affect3_non_specifie": null,
// "affect4_espece": null,
// "affect4_malade": null,
// "affect4_mort": null,
// "affect4_vivant": null,
// "affect4_non_specifie": null,
// "affect5_espece": null,
// "affect5_malade": null,
// "affect5_mort": null,
// "affect5_vivant": null,
// "affect5_non_specifie": null,
// "meta_creation_par": "1beb8181-3e91-486b-9b2f-9ea8b6bbdce5",
// "meta_date_creation": "2012-05-04 08:11:08.557",
// "source": "suivi_rage_raton",
// "date_fermeture_dossier": "2012-05-04 08:11:00",
// "pk_source": 12553
