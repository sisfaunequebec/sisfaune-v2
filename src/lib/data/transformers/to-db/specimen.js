import { isoDateToDb } from '../utils'

import transform from '../transform'

const isEuthanasia = (specimen) => {
  const { deathCause } = specimen
  const deathCauseId = deathCause?.id
  const isEuthanasia = [1, 101, 102].includes(deathCauseId)
  // console.debug('isEuthanasia', isEuthanasia, deathCause)
  return isEuthanasia
}

const isLethalInjection = (specimen) => {
  const { euthanasiaMethod } = specimen
  const euthanasiaMethodId = euthanasiaMethod?.id
  const isLethalInjection = euthanasiaMethodId === 1
  return isLethalInjection
}

const schema = {
  discoveryStateId: specimen => (specimen.discoveryState ? specimen.discoveryState.id : null),
  deathCauseId: specimen => (specimen.deathCause ? specimen.deathCause.id : null),
  euthanizedAt: specimen => (isEuthanasia(specimen) ? isoDateToDb(specimen.euthanizedAt) : null),
  euthanasiaOrganisationId: specimen => (isEuthanasia(specimen) ? (specimen.euthanasiaOrganisation?.id ?? null) : null),
  euthanasiaMethodId: specimen => (true ? (specimen.euthanasiaMethod?.id ?? null) : null),
  bottleNumber: specimen => (isLethalInjection(specimen) ? specimen.bottleNumber : null),
  productAmount: specimen => (isLethalInjection(specimen) ? specimen.productAmount : null),
  terrainIdentificationNumber: null,
  silabIdentificationNumber: null,
  cqsasNumber: null,
  sefaqNumber: null,
  huntingPermitNumber: null,
  identificationMarks: null,
  notes: null,
  keywords: null

  //  sex,
  //  age,
  //  measures,
}

const specimenTransformer = (specimen, context) =>   {
  return transform(schema, specimen, context)
}

export default specimenTransformer