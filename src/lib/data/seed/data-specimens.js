const source = require('./sources/specimen.json')
const euthanasia = require('./sources/euthanasie.json')

const { stringOrNull, stringToBool, dateOrNull, stringToInteger } = require('./utils')

const euthanasiaBySpecimenId = euthanasia.reduce((acc, e) => {
  const { id_specimen, id_methode, date, qtee_ketamine, no_bouteille, id_organisme } = e
  const specimenId = stringToInteger(id_specimen)
  acc[specimenId] = {
    euthanasiaMethodId: stringToInteger(id_methode),
    euthanizedAt: dateOrNull(date),
    productAmount: parseFloat(qtee_ketamine),
    bottleNumber: stringOrNull(no_bouteille),
    euthanasiaOrganisationId: stringToInteger(id_organisme)
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

   const specimenId = stringToInteger(id_specimen)

   const specidId = stringToInteger(id_espece)
   const sexId = stringToInteger(id_sexe)
   const ageId = stringToInteger(id_age)
   const weightUnitId = stringToInteger(id_poids_unite)
   const deathCauseId = stringToInteger(id_cause_mort)

   const discoveryStateId = stringToInteger(id_etat_decouverte)
   const preservationMethodId = stringToInteger(id_methode_conservation) 

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
    eventId: stringToInteger(id_evenement),
    // n: stringToInteger(n),
    sequenceId: stringToInteger(id_sequentiel),
    specimenNumber: stringOrNull(numero_specimen),
    silabIdentificationNumber: stringOrNull(numero_identification_silab),
    cqsasNumber: stringOrNull(numero_cqsas),
    terrainIdentificationNumber: stringOrNull(numero_identification_terrain),
    pathologyNumber: stringOrNull(numero_pathologie),
    huntingPermitNumber: stringOrNull(numero_permis_chasse),
    sefaqNumber: stringOrNull(numero_sefaq),
    identifier: stringOrNull(identifie_par),
    identificationMarks: stringOrNull(marques_identification),
    specieId: specidId,
    ageId: ageId,
    sexId: sexId,
    weight: parseFloat(poids), 
    weightUnitId: weightUnitId !== 0 ? weightUnitId : null,
    euthanasiaMethodId: euthanasiaMethodId !== 0 ? euthanasiaMethodId : null,
    euthanizedAt,
    productAmount,
    bottleNumber,
    euthanasiaOrganisationId: euthanasiaOrganisationId !== 0 ? euthanasiaOrganisationId : null,
    discoveryStateId: discoveryStateId !== 0 ? discoveryStateId : null,
    deathCauseId: deathCauseId,
    preservationMethodId: preservationMethodId,
    notes: stringOrNull(remarques),
    keywords: stringOrNull(motcles),
    createdAt: dateOrNull(meta_date_creation),
    createdById: stringOrNull(meta_creation_par)
  }
})
 
module.exports = transformed
