const source = require('./sources/evenement.json')

const { stringOrNull, stringToBool, dateOrNull } = require('./utils')

// const idsOnly = source.map(p => parseInt(p.id_evenement, 10))
// const idsOnlyById = idsOnly.reduce((acc, p) => {
//   let current = acc[p] || 0
//   current++
//   if (current > 1) {
//     console.debug(p, current)
//   }
//   acc[p] = current
//   return acc
// }, {})

// console.debug()

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

    id_soumissionnaire,
    decouvreur_idem_soumissionnaire,

    contact_humain,
    contact_animal_dom,

    id_intervenant,

    id_type_habitat,

    id_laboratoire,
    date_expedition_labo,
    id_methode_expedition,
    no_suivi_transporteur,
    temperature,
    // observations,
    // comments,
    keywords,
    numero_pathologie,

    affect1_espece,
    affect1_malade,
    affect1_mort,
    affect1_vivant,
    affect1_non_specifie,

    affect2_espece,
    affect2_malade,
    affect2_mort,
    affect2_vivant,
    affect2_non_specifie,

    affect3_espece,
    affect3_malade,
    affect3_mort,
    affect3_vivant,
    affect3_non_specifie,

    affect4_espece,
    affect4_malade,
    affect4_mort,
    affect4_vivant,
    affect4_non_specifie,

    affect5_espece,
    affect5_malade,
    affect5_mort,
    affect5_vivant,
    affect5_non_specifie,

    source,
    pk_source,

    meta_date_creation,
    meta_creation_par
  } = p

  const habitatTypeId = parseInt(id_type_habitat, 10)
  const collaboratorId = parseInt(id_intervenant, 10)
  const labShippingMethodId = parseInt(id_methode_expedition, 10)
  const labId = parseInt(id_laboratoire, 10)
  
  return {
    id: parseInt(id_evenement, 10),
    typeId: parseInt(id_type, 10),

    reportOriginId: parseInt(id_provenance_signalement, 10),

    programId: parseInt(id_programme, 10),

    statusId: parseInt(id_statut, 10),

    silabId: stringOrNull(id_silab),
    mapaqId: stringOrNull(no_mapaq),
    cqsasIncidentNumber: stringOrNull(no_incident_cqsas),

    discovererId: null, // stringOrNull(id_decouvreur), // TODO: discovererId
    discoveredAt: dateOrNull(date_decouverte),

    reportedAt: dateOrNull(date_signalement),
    collectedAt: dateOrNull(date_recolte),
    closedAt: dateOrNull(date_fermeture_dossier),

    submitterId: stringOrNull(id_soumissionnaire), // TODO: submitterId
    isDiscovererSameAsSubmitter: stringToBool(decouvreur_idem_soumissionnaire),

    hadHumanContact: stringToBool(contact_humain),
    hadAnimalContact: stringToBool(contact_animal_dom),

    collaboratorId: collaboratorId === 0 ? null : collaboratorId,

    habitatTypeId: habitatTypeId === 0 ? null : habitatTypeId,

    labId: labId === 0 ? null : labId,
    labShippedAt: dateOrNull(date_expedition_labo),
    labShippingMethodId: labShippingMethodId === 0 ? null : labShippingMethodId,
    labShippingTrackingNumber: stringOrNull(no_suivi_transporteur),

    temperature: parseFloat(temperature),
    // observations: stringOrNull(observations), // TODO
    // comments: stringOrNull(comments), // TODO
    keywords: stringOrNull(keywords),

    pathologyNumber: stringOrNull(numero_pathologie),

    // affectedSpecie1Id: parseInt(affect1_espece, 10),
    affectedSpecie1UnhealtyCount: parseInt(affect1_malade, 10),
    affectedSpecie1DeadCount: parseInt(affect1_mort, 10),
    affectedSpecie1AliveCount: parseInt(affect1_vivant, 10),
    affectedSpecie1NotSpecifiedCount: parseInt(affect1_non_specifie, 10),

    // affectedSpecie2Id: parseInt(affect2_espece, 10),
    affectedSpecie2UnhealtyCount: parseInt(affect2_malade, 10),
    affectedSpecie2DeadCount: parseInt(affect2_mort, 10),
    affectedSpecie2AliveCount: parseInt(affect2_vivant, 10),
    affectedSpecie2NotSpecifiedCount: parseInt(affect2_non_specifie, 10),

    // affectedSpecie3Id: parseInt(affect3_espece, 10),
    affectedSpecie3UnhealtyCount: parseInt(affect3_malade, 10),
    affectedSpecie3DeadCount: parseInt(affect3_mort, 10),
    affectedSpecie3AliveCount: parseInt(affect3_vivant, 10),
    affectedSpecie3NotSpecifiedCount: parseInt(affect3_non_specifie, 10),

    // affectedSpecie4Id: parseInt(affect4_espece, 10),
    affectedSpecie4UnhealtyCount: parseInt(affect4_malade, 10),
    affectedSpecie4DeadCount: parseInt(affect4_mort, 10),
    affectedSpecie4AliveCount: parseInt(affect4_vivant, 10),
    affectedSpecie4NotSpecifiedCount: parseInt(affect4_non_specifie, 10),

    // affectedSpecie5Id: parseInt(affect5_espece, 10),
    affectedSpecie5UnhealtyCount: parseInt(affect5_malade, 10),
    affectedSpecie5DeadCount: parseInt(affect5_mort, 10),
    affectedSpecie5AliveCount: parseInt(affect5_vivant, 10),
    affectedSpecie5NotSpecifiedCount: parseInt(affect5_non_specifie, 10),

    source: stringOrNull(source),
    sourcePk: parseInt(pk_source, 10),

    createdAt: dateOrNull(meta_date_creation),
    createdById: stringOrNull(meta_creation_par) // TODO: createdById NOT NULL
  }
})

module.exports = transformed

// id_evenement,id_type,id_programme,id_statut,id_silab,no_incident_cqsas,date_decouverte,decouvreur_idem_soumissionnaire,id_decouvreur,contact_humain,contact_animal_dom,date_signalement,no_mapaq,id_soumissionnaire,id_provenance_signalement,date_recolte,id_intervenant,id_type_habitat,temperature,date_expedition_labo,id_laboratoire,id_methode_expedition,no_suivi_transporteur,motcles,numero_pathologie,affect1_espece,affect1_malade,affect1_mort,affect1_vivant,affect1_non_specifie,affect2_espece,affect2_malade,affect2_mort,affect2_vivant,affect2_non_specifie,affect3_espece,affect3_malade,affect3_mort,affect3_vivant,affect3_non_specifie,affect4_espece,affect4_malade,affect4_mort,affect4_vivant,affect4_non_specifie,affect5_espece,affect5_malade,affect5_mort,affect5_vivant,affect5_non_specifie,meta_creation_par,meta_date_creation,source,date_fermeture_dossier,pk_source,   observations,commentaires,

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
