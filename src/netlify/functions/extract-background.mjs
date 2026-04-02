import tmp from 'tmp'
import ExcelJS from 'exceljs'

import orderBy from 'lodash.orderby'
import slugify from 'slugify'

import orm from '@/lib/data/database'

import uploadToNetlify from '@/lib/data/tasks/extraction/upload-to-netlify'
import getDataStream from '@/lib/data/tasks/extraction/get-data-stream'

import { dbDateToIso } from '@/lib/data/transformers/utils'
import { progress } from 'framer-motion'

const fixCoordinates = (value) => {
  return value ? parseFloat(value.toString()) : 0
}

const getFullname = (item) => {
  const { firstName, lastName } = item ?? {}
  const nameArray = [firstName, lastName].filter(Boolean)
  const fullname = nameArray.length > 0 ? nameArray.join(' ') : null
  return fullname
}

const getAffectedSpecies = (event) => {
  return Array.from({ length: 5 }, (_, i) => {
    const n = i + 1
    return {
      [`espece_affectee_${n}`]: event[`affectedSpecie${n}`]?.name ?? null,
      [`espece_affectee_${n}_vivant`]: event[`affectedSpecie${n}AliveCount`],
      [`espece_affectee_${n}_malade`]: event[`affectedSpecie${n}UnhealtyCount`],
      [`espece_affectee_${n}_mort`]: event[`affectedSpecie${n}DeadCount`],
      [`espece_affectee_${n}_non_specifie`]: event[`affectedSpecie${n}NotSpecifiedCount`]
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

const getMeasures = (measures, animalMeasureTypeNamesOrderedByName) => {
  const measuresByName = measures.reduce((acc, m) => {
    const { type, value: rawValue } = m 
    const { name, unitTypeId } = type
    const value = [1, 2].includes(unitTypeId) ? (rawValue && parseFloat(rawValue?.toString())) : rawValue
    acc[name] = value
    return acc
  }, {})

  const entries = animalMeasureTypeNamesOrderedByName.reduce((acc, key) => {
    const value = measuresByName[key]
    const slug = columnizeMeasureName(key)
    acc[slug] = value ?? null
    return acc
  }, {})

  return entries
}

const getResults = (results, analysesWithGroupNamesOrderedByName) => {
  const resultsByAnalysisId = results.reduce((acc, r) => {
    const { analysisId, value } = r
    acc[analysisId] = value
    return acc
  }, {})

  const entries = analysesWithGroupNamesOrderedByName.reduce((acc, a) => {
    const { id, name, analysisGroupName } = a
    const key = [analysisGroupName, name].join('-')

    const value = resultsByAnalysisId[id]
    const slug = columnizeAnalysisName
    acc[slug] = value ?? null
    return acc
  }, {})

  return entries
}

const BASE_COLUMNS = [
  'id_evenement',
  'id_specimen',
  'numero_specimen',
  'espece',
  'binome',
  'groupe',
  'numero_identification_terrain',
  'numero_specimen_silab',
  'numero_specimen_cqsas',
  'numero_permis_chasse',
  'marques_identification',
  'etat_decouverte',
  'cause_mort',
  'organisme_reponsable',
  'date_euthanasie',
  'methode_euthanasie',
  'qtee_ketamine',
  'numero_bouteille',
  'age',
  'sexe',
  'methode_conservation',
  'remarques',
  'type_evenement',
  'no_identification_silab',
  'no_incident_cqsas',
  'numero_pathologie',
  'date_signalement',
  'numero_centrale_mapaq',
  'programme',
  'provenance_signalement',
  'statut',
  'soumis_par',
  'organisation',
  'decouvert_par',
  'recolte_par',
  'date_decouverte',
  'date_recolte',
  'contact_humain',
  'contact_animal_domestique',
  'habitat',
  'temperature',
  'espece_affectee_1',
  'espece_affectee_1_vivant',
  'espece_affectee_1_malade',
  'espece_affectee_1_mort',
  'espece_affectee_1_non_specifie',
  'espece_affectee_2',
  'espece_affectee_2_vivant',
  'espece_affectee_2_malade',
  'espece_affectee_2_mort',
  'espece_affectee_2_non_specifie',
  'espece_affectee_3',
  'espece_affectee_3_vivant',
  'espece_affectee_3_malade',
  'espece_affectee_3_mort',
  'espece_affectee_3_non_specifie',
  'espece_affectee_4',
  'espece_affectee_4_vivant',
  'espece_affectee_4_malade',
  'espece_affectee_4_mort',
  'espece_affectee_4_non_specifie',
  'espece_affectee_5',
  'espece_affectee_5_vivant',
  'espece_affectee_5_malade',
  'espece_affectee_5_mort',
  'espece_affectee_5_non_specifie',
  'observations',
  'commentaires_generaux',
  'laboratoire',
  'specimens_expedies_le',
  'numero_connaissement',
  'specimens_recus_le',
  'specimens_recus_par',
  'responsable_dossier',
  'longitude',
  'latitude',
  'id_municipalite',
  'municipalite',
  'mrc',
  'region',
  'nombre_specimens_associes'
]

const getRow = (specimen, animalGroupsById, animalMeasureTypeNamesOrderedByName, analysesWithGroupNamesOrderedByName) => {
  const { 
    eventId, 
    id: specimenId, 
    sequenceId,
    terrainIdentificationNumber = null,
    silabIdentificationNumber = null,
    cqsasNumber = null,
    huntingPermitNumber = null,
    identificationMarks = null,
    euthanizedAt = null,
    productAmount = null,
    bottleNumber = null,
    notes = null,

    specie,
    discoveryState,
    deathCause,
    euthanasiaOrganisation,
    euthanasiaMethod,
    age,
    sex,
    preservationMethod,
    habitatType,
    lab,

    measures,
    results,

    event,
  } = specimen

  const { name: specieName, binome, group } = specie ?? {}

  const { name: discoveryStateName } = discoveryState ?? {}
  const { name: deathCauseName } = deathCause ?? {}
  const { name: euthanasiaOrganisationName = null } = euthanasiaOrganisation ?? {}
  const { name: euthanasiaMethodName = null } = euthanasiaMethod ?? {}
  const { name: ageName = null } = age ?? {}
  const { name: sexName = null } = sex ?? {}
  const { name: preservationMethodName = null } = preservationMethod ?? {}
  const { name: habitatTypeName = null } = habitatType ?? {}
  const { name: labName = null } = lab ?? {}

  const {
    silabId,
    cqsasIncidentNumber,
    pathologyNumber,
    reportedAt,
    mapaqId,
    discoveredAt,
    collectedAt,
    hadHumanContact,
    hadAnimalContact,
    temperature,
    observations,
    comments,

    labShippingTrackingNumber = null,
    labShippedAt = null,
    labReceivedAt = null,
    labReceivedBy = null,

    type: eventType,
    program,
    reportOrigin,
    status,
    location,
    discoverer,
    collaborator,
    submitter,
    labResponsible,

    _count
  } = event

  const { name: eventTypeName } = eventType
  const { name: programName } = program
  const { name: reportOriginName } = reportOrigin
  const { id: statusId, name: statusName } = status

  const isEventClosed = statusId === 3

  const { firstName: discovererFirstName, lastName: discovererLastName } = discoverer ?? {}
  const discoveredByArray = [discovererFirstName, discovererLastName].filter(Boolean)
  const discoveredByName = discoveredByArray.length > 0 ? discoveredByArray.join(' ') : null

  const { firstName: submitterFirstName, lastName: submitterLastName, organisation: submitterOrganisation } = submitter ?? {}
  const submittedByArray = [submitterFirstName, submitterLastName].filter(Boolean)
  const submittedByName = submittedByArray.length > 0 ? submittedByArray.join(' ') : null

  const labResponsibleName = getFullname(labResponsible)

  const { name: collectedByName = null } = collaborator ?? {}

  const { latitude, longitude, localityId, locality } = location
  const { 
    name: localityName = null, 
    mrcName = null,
    regionName = null
  } = locality ?? {}

  const animalGroup = group ? animalGroupsById[group.parentGroupId ?? group.id] : null
  const { name: animalGroupName } = animalGroup ?? {}

  const specimenNumber = [eventId, sequenceId].join('.')

  const { specimens: specimenCount } = _count

  const row = {
    id_evenement: eventId,
    id_specimen: specimenId,
    numero_specimen: specimenNumber,
    espece: specieName,
    binome,
    groupe: animalGroupName,
    numero_identification_terrain: terrainIdentificationNumber,
    numero_specimen_silab: silabIdentificationNumber,
    numero_specimen_cqsas: cqsasNumber,
    numero_permis_chasse: huntingPermitNumber,
    marques_identification: identificationMarks,
    etat_decouverte: discoveryStateName,
    cause_mort: deathCauseName,
    organisme_reponsable: euthanasiaOrganisationName,
    date_euthanasie: dbDateToIso(euthanizedAt),
    methode_euthanasie: euthanasiaMethodName,
    qtee_ketamine: productAmount,
    numero_bouteille: bottleNumber,
    age: ageName,
    sexe: sexName,
    methode_conservation: preservationMethodName,
    remarques: notes,
    type_evenement: eventTypeName,
    no_identification_silab: silabId,
    no_incident_cqsas: cqsasIncidentNumber,
    numero_pathologie: pathologyNumber,
    date_signalement: dbDateToIso(reportedAt),
    numero_centrale_mapaq: mapaqId,
    programme: programName,
    provenance_signalement: reportOriginName,
    statut: statusName,
    soumis_par: submittedByName,
    organisation: submitterOrganisation,
    decouvert_par: isEventClosed ? null : discoveredByName,
    recolte_par: collectedByName,
    date_decouverte: dbDateToIso(discoveredAt),
    date_recolte: dbDateToIso(collectedAt),
    contact_humain: hadHumanContact,
    contact_animal_domestique: hadAnimalContact,
    habitat: habitatTypeName,
    temperature,

    ...getAffectedSpecies(event),

      observations,
      commentaires_generaux: comments,
      laboratoire: labName,
      specimens_expedies_le: dbDateToIso(labShippedAt),
      numero_connaissement: labShippingTrackingNumber,
      specimens_recus_le:	dbDateToIso(labReceivedAt),
      specimens_recus_par: labReceivedBy,
      responsable_dossier: labResponsibleName,
      longitude: fixCoordinates(longitude),
      latitude: fixCoordinates(latitude),
      id_municipalite: localityId,
      municipalite: localityName,
      mrc: mrcName,
      region: regionName,
      nombre_specimens_associes: specimenCount,

      ...getMeasures(measures, animalMeasureTypeNamesOrderedByName),
      ...getResults(results, analysesWithGroupNamesOrderedByName)
    }

    return row
}

const columnizeMeasureName = (name) => slugify(name).toLowerCase().replaceAll('-', '_')
const columnizeAnalysisName = (name) => slugify(name).toLowerCase().replaceAll('-', '_').replaceAll('.', '')

const getColumns = (animalMeasureTypeNamesOrderedByName, analysesWithGroupNamesOrderedByName) => {
  const measuresColumns = animalMeasureTypeNamesOrderedByName.map(columnizeMeasureName)
  const resultsColumns = analysesWithGroupNamesOrderedByName.map(a => columnizeAnalysisName(a.name))
  return [
    ...BASE_COLUMNS,
    ...measuresColumns,
    ...resultsColumns
  ]
}

async function extractToExcel(taskId, params, userId) {
  const animalGroups = await orm.LutAnimalGroupV2.findMany({
    select: {
      id: true,
      name: true,
      parentGroupId: true
    }
  })

  const animalGroupsById = animalGroups.reduce((acc, ag) => {
    const { id, ...rest } = ag 
    acc[id] = rest
    return acc
  }, {})

  const animalMeasureTypes = await orm.LutAnimalMeasureType.findMany({
    select: {
      name: true
    }
  })


  const { analyse: analysisGroupIds = [] } = params

  const analyses = await orm.LutAnalysis.findMany({
    where: {
      analysisGroupId: {
        in: analysisGroupIds
      }
    },
    include: {
      analysisGroup: {
        select: {
          name: true
        }
      },
      codeValues: {
        select: {
          id: true,
          code: true,
          description: true
        }
      }
    }
  })

  const animalMeasureTypeNames = animalMeasureTypes.reduce((acc, am) => {
    const { name } = am 
    if (!acc.includes(name)) {
      acc.push(name)
    }
    return acc
  }, [])

  const animalMeasureTypeNamesOrderedByName = orderBy(animalMeasureTypeNames)

  const analysesWithGroupNames = analyses.map(a => {
    const { id, name, analysisGroupId, codeValues, analysisGroup } = a
    const { name: analysisGroupName } = analysisGroup
    return { id, name, analysisGroupId, analysisGroupName, codeValues } 
  })

  const analysesWithGroupNamesOrderedByName = orderBy(analysesWithGroupNames, ['analysisGroupId', 'name'])

  // const requestedAnalysesNamesOrderedByName = analysesNamesOrderedByName.filter(name => analysisGroupIds.includes(a.analysisGroupId))

  const tempFile = tmp.fileSync({ template: 'XXXXXXXX' })
  const filePath = tempFile.name

  const options = {
    filename: filePath,
    useStyles: true,
    useSharedStrings: true
  }
  
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options)
  const worksheet = workbook.addWorksheet('extraction')

  const columns = getColumns(animalMeasureTypeNamesOrderedByName, analysesWithGroupNamesOrderedByName)

  worksheet.columns = columns.map(c => {
    return { header: c, key: c }
  })
  
  const dataStream = await getDataStream(params, userId)

  // console.debug(animalMeasureTypeNamesOrderedByName)
  // console.debug(analysesNamesOrderedByName)

  let i = 0

  for await (const specimen of dataStream) {
    i++

    const row = getRow(specimen, animalGroupsById, animalMeasureTypeNamesOrderedByName, analysesWithGroupNamesOrderedByName)
    worksheet.addRow(row).commit()

    if ((i % 1000) === 0) {
      console.info(`Extracted ${i} specimens...`)
      await orm.Task.update({
        where: {
          id: taskId
        },
        data: {
          status: 'termine',
          result: {
            progress: i
          }
        }
      })
    }
  }

  await workbook.commit()

  return filePath
}


const handler = async (req, context) => {
  const { method  } = req

  try {
    if (method !== 'POST') {
      return Response.json({ code: 405, message: 'Method not allowed' }, { status: 405 })
    }

    const body = await req.json()
    const { taskId, userId, sessionId, params } = body
    
    const taskData = {
      id: taskId,
      userId,
      sessionId,
      payload: params
    }

    console.debug('Starting extraction task...', { taskData })

    const filePath = await extractToExcel(taskId, params, userId)
    console.debug('Done extracting to Excel...', params, userId)
    
    const fileName = await uploadToNetlify(taskId, filePath)
    console.debug('Done uploading to Netlify...', params, userId)

    await orm.Task.update({
      where: {
        id: taskId
      },
      data: {
        status: 'termine',
        result: {
          blobKey: fileName
        }
      }
    })
  } catch (error) {

    await orm.Task.update({
        where: {
          id: taskId
        },
        data: {
          status: 'errur',
          result: {
            error: JSON.stringify({
              message: error.message,
              stack: error.stack
            })
          }
        }
      })

  }

  return Response.json({ code: 200 })
}

export default handler

