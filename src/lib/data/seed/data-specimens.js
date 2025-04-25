const source = require('./sources/specimen.json')
const euthanasia = require('./sources/euthanasie.json')

const { stringOrNull, stringToBool, dateOrNull } = require('./utils')

const euthanasiaBySpecimenId = euthanasia.reduce((acc, e) => {
  const { id_specimen, id_methode, date, qtee_ketamine, no_bouteille, id_organisme } = e
  const idSpecimen = parseInt(id_specimen, 10)
  acc[idSpecimen] = {
    euthanasiaMethodId: parseInt(id_methode, 10),
    euthanizedAt: dateOrNull(date),
    productAmount: parseFloat(qtee_ketamine),
    bottleNumber: stringOrNull(no_bouteille),
    euthanasiaOrganisationId: parseInt(id_organisme, 10)
  }
  return acc
}, {})

const transformed = source.map(p => {
  const { 
    id_specimen, n, id_evenement , id_sequentiel, numero_specimen,
    numero_identification_terrain,
    numero_identification_silab,
    numero_cqsas,
    numero_pathologie,
    numero_permis_chasse,
    identifie_par,
    marques_identification,
    id_espece,
    id_age,
    id_sexe,
    poids,
    id_poids_unite,
    id_etat_decouverte,
    id_cause_mort,
    id_methode_conservation,
    remarques,
    motcles,
    meta_date_creation,
    meta_creation_par,
    numero_sefaq
   } = p

   const specimenId = parseInt(id_specimen, 10)

   const specidId = parseInt(id_espece, 10)
   const sexId = parseInt(id_sexe, 10)
   const ageId = parseInt(id_age, 10)
   const weightUnitId = parseInt(id_poids_unite, 10)

   const discoveryStateId = parseInt(id_etat_decouverte, 10)

   const euthanasia = euthanasiaBySpecimenId[specimenId] ?? {}
   const {
    euthanasiaMethodId,
    euthanizedAt,
    productAmount,
    bottleNumber,
    euthanasiaOrganisationId
   } = euthanasia

  return {
    id: specimenId,
    eventId: parseInt(id_evenement, 10),
    n: parseInt(n, 10),
    sequenceId: parseInt(id_sequentiel, 10),
    specimenNumber: stringOrNull(numero_specimen),
    silabIdentificationNumber: stringOrNull(numero_identification_silab),
    cqsasNumber: stringOrNull(numero_cqsas),
    terrainIdentificationNumber: stringOrNull(numero_identification_terrain),
    pathologyNumber: stringOrNull(numero_pathologie),
    huntingPermitNumber: stringOrNull(numero_permis_chasse),
    sefaqNumber: stringOrNull(numero_sefaq),
    identifier: stringOrNull(identifie_par),
    identificationMarks: stringOrNull(marques_identification),
    specieId: specidId ? specidId : null,
    ageId: ageId ? ageId : null,
    sexId: sexId !== 0 ? sexId : null,
    weight: parseFloat(poids), 
    weightUnitId: weightUnitId !== 0 ? weightUnitId : null,
    euthanasiaMethodId: euthanasiaMethodId !== 0 ? euthanasiaMethodId : null,
    euthanizedAt,
    productAmount,
    bottleNumber,
    euthanasiaOrganisationId: euthanasiaOrganisationId !== 0 ? euthanasiaOrganisationId : null,
    discoveryStateId: discoveryStateId !== 0 ? discoveryStateId : null,
    deathCauseId: parseInt(id_cause_mort, 10),
    preservationMethodId: parseInt(id_methode_conservation, 10),
    notes: stringOrNull(remarques),
    keywords: stringOrNull(motcles),
    createdAt: dateOrNull(meta_date_creation),
    createdById: stringOrNull(meta_creation_par)
  }
})
 
module.exports = transformed
