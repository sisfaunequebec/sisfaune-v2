import { m } from 'framer-motion'
import * as v from 'valibot'

const isEuthanasia = (specimen) => {
  const { deathCause } = specimen
  const deathCauseId = deathCause?.id
  const isEuthanasia = [1, 101, 102].includes(deathCauseId)
  // console.debug('isEuthanasia', isEuthanasia, deathCause)
  return isEuthanasia
}

const isLethalInjection = (specimen) => {
  console.debug('isLethalInjection', specimen)
  const { euthanasiaMethod } = specimen
  const euthanasiaMethodId = euthanasiaMethod?.id
  const isLethalInjection = euthanasiaMethodId === 1
  return isLethalInjection
}

const schema = v.pipe(
  // v.forward(v.partialCheck((specimen) => { console.debug(specimen); return false }, 'Shit'), ['bottleNumber']),
  v.object({
    discoveryState: v.object({ id: v.integer() }),
    deathCause: v.object({ id: v.integer() }),
    euthanizedAt: v.nullish(v.isoDate()),
    euthanasiaOrganisation: v.nullish(v.object({ id: v.integer() })), 
    euthanasiaMethod: v.nullish(v.object({ id: v.integer() })), 
    productAmount: v.nullish(v.any()),
    bottleNumber: v.nullish(v.string()),
    terrainIdentificationNumber: v.nullish(v.string()),
    silabIdentificationNumber: v.nullish(v.string()),
    cqsasNumber: v.nullish(v.string()),
    sefaqNumber: v.nullish(v.string()),
    huntingPermitNumber: v.nullish(v.string()),
    identificationMarks: v.nullish(v.string()),
    notes: v.nullish(v.string()),
    keywords: v.nullish(v.string())
  }),
  v.forward(
    v.custom((specimen) => {
      if (isLethalInjection(specimen)) {
        return specimen.productAmount !== null
      }
      return true
    }, 'La quantité est requise'),
    ['productAmount']
  ),
  v.forward(
    v.custom((specimen) => {
      if (isLethalInjection(specimen)) {
        return specimen.bottleNumber !== null
      }
      return true
    }, 'Le numéro de bouteille est requis'),
    ['bottleNumber']
  ),
)

export default schema


  // discoveryStateId: specimen => (specimen.discoveryState ? specimen.discoveryState.id : null),
  // deathCauseId: specimen => (specimen.deathCause ? specimen.deathCause.id : null),
  // euthanizedAt: specimen => (isEuthanasia(specimen) ? isoDateToDb(specimen.euthanizedAt) : null),
  // euthanasiaOrganisationId: specimen => (isEuthanasia(specimen) ? (specimen.euthanasiaOrganisation?.id ?? null) : null),
  // euthanasiaMethodId: specimen => (true ? (specimen.euthanasiaMethod?.id ?? null) : null),
  // bottleNumber: specimen => (isLethalInjection(specimen) ? specimen.bottleNumber : null),
  // productAmount: specimen => (isLethalInjection(specimen) ? specimen.productAmount : null),
  // terrainIdentificationNumber: null,
  // silabIdentificationNumber: null,
  // cqsasNumber: null,
  // sefaqNumber: null,
  // huntingPermitNumber: null,
  // identificationMarks: null,
  // notes: null,
  // keywords: null