import { isoDateToDb } from '../utils'
// import locationTransformer from './location.js'
// import affectedSpeciesTransformer from './affected-species.js'

import transform from '../transform'

const transformDiscoverer = (discoverer) => {
  const { locality, ...rest } = discoverer
  return {
    ...rest,
    localityId: locality?.id || null
  }
}
  
const unBuildAffectedSpecies = () => {
  const keys = {}
  const arrayIndexes = [0, 1, 2, 3, 4]
  arrayIndexes.forEach(i => {
    const index = i + 1
    keys[`affectedSpecie${index}Id`] = (event) => (event.affectedSpecies[i] ? event.affectedSpecies[i].specieId : null)
    keys[`affectedSpecie${index}AliveCount`] = (event) => (event.affectedSpecies[i] ? event.affectedSpecies[i].aliveCount : null)
    keys[`affectedSpecie${index}UnhealtyCount`] = (event) => (event.affectedSpecies[i] ? event.affectedSpecies[i].unhealthyCount : null)
    keys[`affectedSpecie${index}DeadCount`] = (event) => (event.affectedSpecies[i] ? event.affectedSpecies[i].deadCount : null)
    keys[`affectedSpecie${index}NotSpecifiedCount`] = (event) => (event.affectedSpecies[i] ? event.affectedSpecies[i].notSpecifiedCount : null)
  })
  return keys
}

const schema = {
  typeId: event => (event.type ? event.type.id : null),
  silabId: null,
  cqsasIncidentNumber: null,
  pathologyNumber: null,
  reportedAt: event => isoDateToDb(event.reportedAt),
  mapaqId: null,
  programId: event => (event.program ? event.program.id : null),
  reportOriginId: event => (event.reportOrigin ? event.reportOrigin.id : null),
  statusId: event => (event.status ? event.status.id : null),
  closedAt: event => isoDateToDb(event.closedAt),

  submitterId: event => (event.submitter ? event.submitter.id : null),
  isDiscovererSameAsSubmitter: null,
  discoverer: event => transformDiscoverer(event.discoverer),
  discoveredAt: event => isoDateToDb(event.discoveredAt),
  collaboratorId: event => (event.collaborator ? event.collaborator.id : null),

  collectedAt: event => isoDateToDb(event.collectedAt),
  hadHumanContact: null,
  hadAnimalContact: null,
  habitatTypeId: event => (event.habitatType ? event.habitatType.id : null),
  temperature: null,
  
  observations: null,
  comments: null,
  keywords: null,

  labShippedAt: event => isoDateToDb(event.labShippedAt),
  labShippingMethodId: event => (event.labShippingMethod ? event.labShippingMethod.id : null),
  labShippingTrackingNumber: null,
  labId: event => (event.lab ? event.lab.id : null),  

  ...unBuildAffectedSpecies()
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer