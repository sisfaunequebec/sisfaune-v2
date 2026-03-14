const source = require('./sources/specimen.json')
const euthanasia = require('./sources/euthanasie.json')

const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const euthanasiaBySpecimenId = euthanasia.reduce((acc, e) => {
  const { id_specimen, id_methode, date, qtee_ketamine, no_bouteille, id_organisme } = e
  const specimenId = parseIntegerOrNull(id_specimen)
  acc[specimenId] = {
    euthanasiaMethodId: parseIntegerOrNull(id_methode),
    euthanizedAt: dateOrNull(date),
    productAmount: parseFloat(qtee_ketamine),
    bottleNumber: stringOrNull(no_bouteille),
    euthanasiaOrganisationId: parseIntegerOrNull(id_organisme)
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

   const specimenId = parseIntegerOrNull(id_specimen)

   const specidId = parseIntegerOrNull(id_espece)
   const sexId = parseIntegerOrNull(id_sexe)
   const ageId = parseIntegerOrNull(id_age)
   const weightUnitId = parseIntegerOrNull(id_poids_unite)
   const deathCauseId = parseIntegerOrNull(id_cause_mort)

   const discoveryStateId = parseIntegerOrNull(id_etat_decouverte)
   const preservationMethodId = parseIntegerOrNull(id_methode_conservation) 

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
    eventId: parseIntegerOrNull(id_evenement),
    // n: parseIntegerOrNull(n),
    sequenceId: parseIntegerOrNull(id_sequentiel),
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
    ageId: ageId === 0 ? null : ageId,
    sexId: sexId === 0 ? null : sexId,
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
