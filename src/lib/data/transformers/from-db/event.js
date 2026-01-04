import orderBy from 'lodash.orderby'

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

  analysisGroups: event => transformAnalysisGroups(event.eventAnalysisGroups),
  specimens: null
}

const transformAnalysisGroups = (eventAnalysisGroups) => {
  return eventAnalysisGroups.map(eag => {
    const { analysisGroupId: id, eventId, analysisGroup } = eag
    const { name, analyses } = analysisGroup
    const transformed = transformAnalyses(analyses)
    return {
      id,
      eventId,
      name,
      analyses: orderBy(transformed, 'id')
    }
  })
}

const transformAnalyses = (analyses) => {
  return analyses.map(a => {
    const { id, name, unit, precision, resultTypeId, results, codeValues } = a
    const transformed = transformResults(results).map(r => ({ ...r }))

    return {
      id,
      name, 
      unit,
      precision,
      resultTypeId,
      results: orderBy(transformed, 'specimenSequenceId'),
      codeValues: codeValues || []
    }
  }).filter(a => a.results.length > 0)
}

const transformResults = (results) => {
  return results.map(r => {
    const { id, value, specimen } = r
    const { eventId, sequenceId, specie } = specimen
    const { name } = specie
    return {
      id,
      eventId,
      specimenSequenceId: sequenceId,
      specimenSpecieName: name,
      value
    }
  })
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer