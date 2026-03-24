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

  analysisGroups: event => transformAnalysisGroups(event),
  specimens: event => transformSpecimens(event),
}

const transformSpecimens = (event) => {
  const { specimens } = event
  const transformedSpecimens = specimens?.map(s => {
    const { euthanizedAt } = s
    return {
      ...s,
      euthanizedAt: dbDateToIso(euthanizedAt)
    }
  })
  return transformedSpecimens
}

const transformAnalysisGroups = (event) => {
  const { eventAnalysisGroups, specimens } =  event  

  const transformedSpecimens = specimens.map(s => {
    const { id, eventId, sequenceId, specie } = s
    const { name } = specie
    return {
      id,
      eventId,
      sequenceId,
      specieName: name
    }
  })

  const results = specimens.flatMap(s => s.results)
  
  return eventAnalysisGroups.map(eag => {
    const { analysisGroupId: id, eventId, analysisGroup } = eag
    const { name, analyses } = analysisGroup
    const transformed = transformAnalyses(analyses, transformedSpecimens, results)
    return {
      id,
      eventId,
      name,
      analyses: orderBy(transformed, 'id')
    }
  })
}

const transformAnalyses = (analyses, transformedSpecimens, allResults) => {
  return analyses.filter(a => a.isActive).map(a => {
    const { id, name, unit, precision, resultTypeId, codeValues } = a

    const results = allResults.filter(r => r.analysisId === id)
    const transformedResults = transformResults(results, transformedSpecimens).map(r => ({ ...r }))

    return {
      id,
      name, 
      unit,
      precision,
      resultTypeId,
      results,
      results: orderBy(transformedResults, 'specimenSequenceId'),
      codeValues: codeValues || []
    }
  }).filter(a => a.results.length > 0)
}

const transformResults = (results, transformedSpecimens) => {
  const specimenMap = transformedSpecimens.reduce((acc, s) => {
    acc[s.id] = s
    return acc
  }, {})

  return results.map(r => {
    const { id, value, specimenId } = r
    const specimen = specimenMap[specimenId]
    const { eventId, sequenceId, specieName } = specimen

    return {
      id,
      eventId,
      specimenSequenceId: sequenceId,
      specimenSpecieName: specieName,
      value
    }
  })
}

const eventTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default eventTransformer