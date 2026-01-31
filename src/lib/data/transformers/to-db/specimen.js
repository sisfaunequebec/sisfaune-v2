import { isoDateToDb } from '../utils'

import transform from '../transform'

const isEuthanasia = (specimen) => {
  const { deathCause } = specimen
  const deathCauseId = deathCause?.id
  const isEuthanasia = [1, 101, 102].includes(deathCauseId)
  return isEuthanasia
}

const isLethalInjection = (specimen) => {
  const { euthanasiaMethod } = specimen
  const euthanasiaMethodId = euthanasiaMethod?.id
  const isLethalInjection = euthanasiaMethodId === 1
  return isLethalInjection
}

const schema = {

  terrainIdentificationNumber: null,
  silabIdentificationNumber: null,
  cqsasNumber: null,
  sefaqNumber: null,
  huntingPermitNumber: null,
  identificationMarks: null,
  discoveryStateId: specimen => (specimen.discoveryState ? specimen.discoveryState.id : null),
  deathCauseId: specimen => (specimen.deathCause ? specimen.deathCause.id : null),
  
  euthanizedAt: specimen => (isEuthanasia(specimen) ? isoDateToDb(specimen.euthanizedAt) : null),
  euthanasiaOrganisationId: specimen => (isEuthanasia(specimen) ? (specimen.euthanasiaOrganisation?.id ?? null) : null),
  euthanasiaMethodId: specimen => (isEuthanasia(specimen) ? (specimen.euthanasiaMethod?.id ?? null) : null),
  bottleNumber: specimen => (isEuthanasia(specimen) && isLethalInjection(specimen) ? specimen.bottleNumber : null),
  productAmount: specimen => (isEuthanasia(specimen) && isLethalInjection(specimen) ? specimen.productAmount : null),

  sexId: specimen => (specimen.sex ? specimen.sex.id : null),
  ageId: specimen => (specimen.age ? specimen.age.id : null),
  measures: null,

  notes: null,
  keywords: null,

  preservationMethodId: specimen => (specimen.preservationMethod ? specimen.preservationMethod.id : null)
}

const specimenTransformer = (specimen, context) =>   {
  return transform(schema, specimen, context)
}

export default specimenTransformer