const source = require('./sources/evenement.json')
const laboratories = require('./sources/laboratoire.json')

const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const laboratoriesByEventId = laboratories.reduce((acc, e) => {
  const { id_evenement, date_reception, recu_par, id_responsable } = e
  const eventId = parseIntegerOrNull(id_evenement)
  acc[eventId] = {
    labReceivedAt: dateOrNull(date_reception),
    labReceivedBy: stringOrNull(recu_par),
    labResponsibleId: stringOrNull(id_responsable)
  }
  return acc
}, {})

// const idsOnly = source.map(p => parseInt(p.id_evenement))
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

    // id_decouvreur,
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

  const eventId = parseIntegerOrNull(id_evenement)

  const habitatTypeId = parseIntegerOrNull(id_type_habitat)
  const collaboratorId = parseIntegerOrNull(id_intervenant)
  const labShippingMethodId = parseIntegerOrNull(id_methode_expedition)
  const labId = parseIntegerOrNull(id_laboratoire)

  const laboratory = laboratoriesByEventId[eventId] ?? {}
  const {
    labReceivedAt,
    labReceivedBy,
    labResponsibleId
  } = laboratory
  
  return {
    id: eventId,
    typeId: parseIntegerOrNull(id_type),

    reportOriginId: parseIntegerOrNull(id_provenance_signalement),

    programId: parseIntegerOrNull(id_programme),

    statusId: parseIntegerOrNull(id_statut),

    silabId: stringOrNull(id_silab),
    mapaqId: stringOrNull(no_mapaq),
    cqsasIncidentNumber: stringOrNull(no_incident_cqsas),

    // discovererId: stringOrNull(id_decouvreur), // TODO: discovererId
    discoveredAt: dateOrNull(date_decouverte),

    reportedAt: dateOrNull(date_signalement),
    collectedAt: dateOrNull(date_recolte),
    closedAt: dateOrNull(date_fermeture_dossier),

    submitterId: stringOrNull(id_soumissionnaire),
    isDiscovererSameAsSubmitter: stringToBool(decouvreur_idem_soumissionnaire),

    hadHumanContact: stringToBool(contact_humain),
    hadAnimalContact: stringToBool(contact_animal_dom),

    collaboratorId: collaboratorId === 0 ? null : collaboratorId,

    habitatTypeId: habitatTypeId === 0 ? null : habitatTypeId,

    labId: labId === 0 ? null : labId,
    labShippedAt: dateOrNull(date_expedition_labo),
    labShippingMethodId: labShippingMethodId === 0 ? null : labShippingMethodId,
    labShippingTrackingNumber: stringOrNull(no_suivi_transporteur),

    labReceivedAt,
    labReceivedBy,
    labResponsibleId,

    temperature: parseFloat(temperature),
    // observations: stringOrNull(observations), // TODO
    // comments: stringOrNull(comments), // TODO
    keywords: stringOrNull(keywords),

    pathologyNumber: stringOrNull(numero_pathologie),

    affectedSpecie1Id: parseIntegerOrNull(affect1_espece),
    affectedSpecie1UnhealtyCount: parseIntegerOrNull(affect1_malade),
    affectedSpecie1DeadCount: parseIntegerOrNull(affect1_mort),
    affectedSpecie1AliveCount: parseIntegerOrNull(affect1_vivant),
    affectedSpecie1NotSpecifiedCount: parseIntegerOrNull(affect1_non_specifie),

    affectedSpecie2Id: parseIntegerOrNull(affect2_espece),
    affectedSpecie2UnhealtyCount: parseIntegerOrNull(affect2_malade),
    affectedSpecie2DeadCount: parseIntegerOrNull(affect2_mort),
    affectedSpecie2AliveCount: parseIntegerOrNull(affect2_vivant),
    affectedSpecie2NotSpecifiedCount: parseIntegerOrNull(affect2_non_specifie),

    affectedSpecie3Id: parseIntegerOrNull(affect3_espece),
    affectedSpecie3UnhealtyCount: parseIntegerOrNull(affect3_malade),
    affectedSpecie3DeadCount: parseIntegerOrNull(affect3_mort),
    affectedSpecie3AliveCount: parseIntegerOrNull(affect3_vivant),
    affectedSpecie3NotSpecifiedCount: parseIntegerOrNull(affect3_non_specifie),

    affectedSpecie4Id: parseIntegerOrNull(affect4_espece),
    affectedSpecie4UnhealtyCount: parseIntegerOrNull(affect4_malade),
    affectedSpecie4DeadCount: parseIntegerOrNull(affect4_mort),
    affectedSpecie4AliveCount: parseIntegerOrNull(affect4_vivant),
    affectedSpecie4NotSpecifiedCount: parseIntegerOrNull(affect4_non_specifie),

    affectedSpecie5Id: parseIntegerOrNull(affect5_espece),
    affectedSpecie5UnhealtyCount: parseIntegerOrNull(affect5_malade),
    affectedSpecie5DeadCount: parseIntegerOrNull(affect5_mort),
    affectedSpecie5AliveCount: parseIntegerOrNull(affect5_vivant),
    affectedSpecie5NotSpecifiedCount: parseIntegerOrNull(affect5_non_specifie),

    source: stringOrNull(source),
    sourcePk: parseIntegerOrNull(pk_source),

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
