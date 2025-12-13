import { isoDateToDb } from '../utils'
// import locationTransformer from './location.js'
// import affectedSpeciesTransformer from './affected-species.js'

import transform from '../transform'

const schema = {

  // id: null,
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
  discoverer: null,
  discoveredAt: event => isoDateToDb(event.discoveredAt),
  collaboratorId: event => (event.collaborator ? event.collaborator.id : null),

  collectedAt: event => isoDateToDb(event.collectedAt),
  hadHumanContact: null,
  hadAnimalContact: null,
  habitatTypeId: event => (event.habitatType ? event.habitatType.id : null),
  temperature: null,
  
  // // affectedSpecies: affectedSpeciesTransformer,
  observations: null,
  comments: null,
  keywords: null,

  labShippedAt: event => isoDateToDb(event.labShippedAt),
  labShippingMethodId: event => (event.labShippingMethod ? event.labShippingMethod.id : null),
  labShippingTrackingNumber: null,
  labId: event => (event.lab ? event.lab.id : null),

  // location: (event, context) => locationTransformer(event.location, context),

  // analyses: { fromDB: null },
  // specimens: null
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer