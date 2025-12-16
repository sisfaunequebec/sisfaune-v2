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
  isDiscovererSameAsSubmitter: null,
  discoveredAt: event => dbDateToIso(event.discoveredAt),
  collaborator: null,

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

  analyses: event => transformEventAnalyses(event.eventAnalyses),
  specimens: null
}


const transformEventAnalyses = (eventAnalyses) => {
  return eventAnalyses.map(ea => {
    const { eventId, analysisGroupId: id, analysisGroup } = ea
    const { name, analyses } = analysisGroup
    const transformed = transformAnalyses(analyses)
    return {
      id,
      eventId, 
      name,
      analyses: transformed
    }
  })
}

const transformAnalyses = (analyses) => {
  return analyses.map(a => {
    const { name, resultTypeId, results } = a
    const transformed = transformResults(results)
    return {
      name, 
      resultTypeId,
      results: transformed
    }
  })
}

const transformResults = (results) => {
  return results.map(r => {
    const { specimenId, value, specimen } = r
    const { eventId, sequenceId } = specimen
    return {
      eventId,
      specimenSequenceId: sequenceId,
      value
    }
  })
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer