'use server'
import 'server-only'

// import ExcelJS from 'exceljs'
// import tmp from 'tmp'

import { DateTime } from 'luxon'

import * as XLSX from 'xlsx'
import { writeToBuffer  } from '@fast-csv/format'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { canUserViewProgram, canUserDeleteEvent, canUserSubmitInProgram, filterViewablePrograms, userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'

import fromDbEventTransformer from '../transformers/from-db/event'
import toDbEventTransformer from '../transformers/to-db/event'

const SORT_MAP = {
  date_signalement: 'reportedAt',
  date_creation: 'createdAt',
  id: 'id'
}

const DATE_MAP = {
  date_signalement: 'reportedAt',
  date_decouverte: 'discoveredAt',
  date_recolte: 'collectedAt'
}

const getSortField = (value) => {
  if (!value) {
    return 'createdAt'
  } else {
    return SORT_MAP[value]
  }
}

const getOrderByClause = (tri, direction) => {
  const sortField = getSortField(tri)
  const sortDirection = direction ?? 'desc'

  const sortClause = ['id', 'createdAt'].includes(sortField) ? sortDirection : { sort: sortDirection, nulls: 'last' }
  
  let orderByClause = [
    { [sortField]: sortClause }
  ]

  if (sortField !== 'id') {
    orderByClause.push({ id: 'desc' })
  }

  // console.debug(orderByClause)

  return orderByClause
}

const getPartialDateClause = (date, start, end) => {
  const fieldName = DATE_MAP[date] || 'reportedAt'

  const conditions = [
    start ? { [fieldName]: { gte: DateTime.fromFormat(start, 'yyyy-LL-dd').toJSDate() } } : null,
    end ? { [fieldName]: { lte: DateTime.fromFormat(end, 'yyyy-LL-dd').toJSDate() } } : null
  ]

  return {
    AND: conditions.filter(Boolean)
  }
}

const getWhereClauseFromParams = (params, user) => {
  const { statut, programme, region, groupe, texte: texteRaw, date, start, end } = params

  const { permissions } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined
  const isTextNumber = isNaN(texte) ? false : true

  const programsIds = programme ? programme : viewableProgramIds

  const partialDateClause = getPartialDateClause(date, start, end) 
  // console.debug('partialDateClause', partialDateClause)

  const whereClause = {
    statusId: statut ? { in: statut } : undefined,
    programId: { in: programsIds },
    specimens: groupe ? {
      some: {
        specie: {
          groupId: { in: groupe } 
        }
      }
    } : undefined,
    location: {
      locality: {
        regionId: region ? { in: region } : undefined
      }
    },
    ...partialDateClause,
    OR: texte ? [
      { id: isTextNumber ? parseInt(texte, 10) : undefined },
      { silabId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
      { cqsasIncidentNumber: texte ? { contains: texte, mode: 'insensitive' } : undefined },
      { mapaqId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
      { pathologyNumber: texte ? { contains: texte, mode: 'insensitive' } : undefined },
      { submitter: { lastName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
      { submitter: { firstName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
      { location: {
          locality: {
            name: texte ? { contains: texte, mode: 'insensitive' } : undefined
          }
        }
      }
    ] : undefined
  }

  return whereClause
}

const getEventsCount = async (params) => {
  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)

  const count = await orm.Event.count({
    where: whereClause
  })

  return count
}

const toEventsDTO = (events) => {
  const transformed = events.map(e => {
    const { id, silabId, mapaqId, reportedAt, type, program, submitter, location } = e

    const { name: typeName } = type
    const { name: programName } = program

    const submitterName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ')

    const locality = location?.locality
    const localityName = locality?.name

    const transformed = {
      id,
      silabId,
      mapaqId,
      reportedAt,
      typeName,
      programName,
      submitterName,
      localityName
    }

    return JSON.parse(JSON.stringify(transformed))
  })

  return transformed
}

const getEventsData = async (params, include) => {
  const { tri, direction, offset = 0, take = 25 } = params

  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)
  const orderByClause = getOrderByClause(tri, direction)

  const events = await orm.Event.findMany({
    where: whereClause,
    include,
    orderBy: orderByClause,
    skip: take ? (offset * take) : undefined,
    take: take ? take : undefined
  })

  return events
}

const getEvents =  async (params) => {
  const include = {
    type: true,
    program: true,
    submitter: true,
    location: {
      include: {
        locality: true
      }
    }
  }

  const events = await getEventsData(params, include)

  const transformed = toEventsDTO(events)
  return transformed
}

const getEvent = async (id) => {
  const user = await getUser()

  if (!id) {
    return null
  }

  if (!user) {
    return null
  }

  try {
    const event = await orm.Event.findUnique({
      where: {
        id
      },
      include: {
        type: true,
        program: true,
        reportOrigin: true,
        status: true,
        habitatType: true,
        labShippingMethod: true,
        lab: true,
        location: {
          include: {
            locality: true
          }
        },
        affectedSpecie1: true,
        affectedSpecie2: true,
        affectedSpecie3: true, 
        affectedSpecie4: true,
        affectedSpecie5: true,
        labResponsible: true,
        submitter: true,
        discoverer: {
          include: {
            locality: true
          }
        },
        collaborator: true,
        specimens: {
          orderBy: {
            sequenceId: 'asc',
          },
          include: {
            specie: {
              include: {
                group: true
              }
            },
            age: true,
            sex: true,
            discoveryState: true,
            deathCause: true,
            euthanasiaMethod: true,
            preservationMethod: true,
            euthanasiaOrganisation: true,
            measures: {
              include: {
                type: true,
                unit: true
              }
            },
            results: true
          }
        },
        eventAnalysisGroups: {
          include: {
            analysisGroup: {
              include: {
                analyses: {
                  include: {
                    codeValues: true,
                    // results: {
                    //   include: {
                    //     specimen: {
                    //       include: {
                    //         specie: true
                    //       }
                    //     }
                    //   }    
                    // }
                  }
                }
              }
            },
          },
          orderBy: {
            analysisGroup: {
              name: 'asc',
            } 
          }
        }
      }
    })
  
    if (!event) {
      return null
    }

    const { programId } = event
    
    if (!canUserViewProgram(user, programId)) {
      return null
    }

    // console.debug(JSON.stringify(event.eventAnalyses))

    const transformed = fromDbEventTransformer(event, { user })
    return JSON.parse(JSON.stringify(transformed))
  } catch (e) {
    console.warn(e)
    return null
  }
}

const addEvent = async (data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const { reportOriginId, typeId, statusId, programId, ...rest } = data

  const canAddEvent = canUserSubmitInProgram(user, programId)
  if (!canAddEvent) {
    throw new Error()
  }

  const { id: submitterId } = user

  const newEvent = await orm.Event.create({
    data: {
      ...rest,
      createdBy: {
        connect: {
          id: submitterId
        }
      },
      type: {
        connect: {
          id: typeId
        }
      },
      program: {
        connect: {
          id: programId
        }
      },
      status: {
        connect: {
          id: statusId
        }
      },
      submitter: {
        connect: {
          id: submitterId
        }
      },
      reportOrigin: {
        connect: {
          id: reportOriginId
        }
      }
    }
  })

  return { data: newEvent }
}

const deleteEvent = async (id) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const canUserDeleteEvent = userCanDeleteEvent(user)

  if (!canDeleteEvent) {
    throw new Error()
  }

  await orm.event.delete({
    where: {
      id
    }
  })

  return true
}

const toArrayBuffer = (buffer) => {
  const arrayBuffer = new ArrayBuffer(buffer.length)
  const view = new Uint8Array(arrayBuffer)
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i]
  }
  return arrayBuffer
}

const generateExcelFile = async (rows) => {
  const worksheet = XLSX.utils.aoa_to_sheet(rows)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Spécimens')

  const arrayBuffer = XLSX.write(workbook, { type: 'array' })
  return arrayBuffer
}

const generateCsvFile = async (rows) => {
  const buffer = await writeToBuffer(rows)
  const arrayBuffer = toArrayBuffer(buffer)
  return arrayBuffer
}

const exportEvents = async (params) => {
  const { format, ...rest } = params

  const data = await getEventsData(rest)

  // Transform to array of arrays

  const [firstRow] = data
  const headers = Object.keys(firstRow)

  const rows = []
  rows.push(headers)

  data.forEach(record => {
    rows.push(Object.values(record))
  })

  const now = DateTime.now()
  const shortDate = now.toFormat('yyyyLLdd')

  const fileName = format === 'csv' ? `specimens-${shortDate}.csv` : `specimens-${shortDate}.xlsx`
  const mimeType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  const exporter = format === 'csv' ? generateCsvFile : generateExcelFile
  const file = await exporter(rows)

  return {
    file,
    fileName,
    mimeType
  }
}

const updateGeneralInfos = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const { id, ...rest } = data

  const transformed = toDbEventTransformer(rest, { user })

  const { discoverer, ...eventData } = transformed
  const { locality, ...discovererData  } = discoverer || {}

  await orm.$transaction(async prisma => {
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: eventData
    })

    await prisma.discoverer.update({
      where: {
        eventId,
      },
      data: discovererData
    })
  })

  return null
}

export {
  getEvents,
  getEventsCount,
  getEvent,
  addEvent,
  deleteEvent,
  exportEvents,
  updateGeneralInfos
}
