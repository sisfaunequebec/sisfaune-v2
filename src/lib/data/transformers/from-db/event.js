import { dbDateToIso } from '../utils'
import locationTransformer from './location.js'
import affectedSpeciesTransformer from './affected-species.js'

import transform from '../transform'

const schema = {

  id: null,
  type: null,
  silabId: null,
  cqsasIncidentNumber: null,
  pathologyNumber: null,
  reportedAt: event => dbDateToIso(event.reportedAt),
  mapaqId: null,
  program: null,
  reportOrigin: null,
  status: null,
  closedAt: event => dbDateToIso(event.closedAt),

  submitter: null,
  discoverer: null,
  collaborator: null,

  discoveredAt: event => dbDateToIso(event.discoveredAt),
  collectedAt: event => dbDateToIso(event.collectedAt),
  hadHumanContact: null,
  hadAnimalContact: null,
  habitatType: null,
  temperature: null,

  affectedSpecies: event => affectedSpeciesTransformer(event),
  observations: null,
  comments: null,
  keywords: null,

  labShippedAt: event => dbDateToIso(event.labShippedAt),
  labShippingMethod: null,
  labShippingTrackingNumber: null,
  lab: null,

  location: (event, context) => locationTransformer(event.location, context),

  labReceivedAt: event => dbDateToIso(event.labReceivedAt),
  labResponsible: null,
  labReceivedBy: null,

  // analyses: { fromDB: null },
  specimens: null
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer