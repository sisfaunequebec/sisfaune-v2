'use server'
import 'server-only'

import { DateTime } from 'luxon'

import * as XLSX from 'xlsx'
import { writeToBuffer  } from '@fast-csv/format'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { canUserViewProgram, canUserDeleteEvent, canUserSubmitInProgram, filterViewablePrograms, userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'

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
  const orderByClause = { [sortField]: sortClause }

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

    return {
      id,
      silabId,
      mapaqId,
      reportedAt,
      typeName,
      programName,
      submitterName,
      localityName
    }
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
  return toEventsDTO(events)
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
        location: true,
        labResponsible: true,
        specimens: {
          include: {
            specie: true,
            age: true,
            sex: true,
            discoveryState: true,
            deathCause: true,
            preservationMethod: true,
            measures: {
              include: {
                type: true,
                unit: true
              }
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

    const canUserViewSpecimensSection = userCanViewSpecimenSection(user, programId)
    const canUserViewAnalysisSection = userCanViewAnalysisSection(user, programId)

    const { specimens, ...restEvent } = event

    const transformed = {
      ...restEvent,
      specimens: canUserViewSpecimensSection ? specimens : null,
      analyses: canUserViewAnalysisSection ? [] : null
    }

    return transformed

  } catch (e) {
    // console.warn(e)
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

  const added = await orm.Event.create({
    data: {
      ...rest,
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

  return added
}

const deleteEvent = async (id) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const canDeleteEvent = canUserDeleteEvent(user)

  if (!canDeleteEvent) {
    throw new Error()
  }

  await orm.event.delete({
    where: {
      id
    }
  })

  return null
}

const addSpecimenToEvent = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  // const { reportOriginId, typeId, statusId, programId, ...rest } = data

  // const canAddEvent = canUserSubmitInProgram(user, programId)
  // if (!canAddEvent) {
  //   throw new Error()
  // }

  // const { id: submitterId } = user

  const added = await orm.Specimen.create({
    data: {
      eventId,
      ...data,
      // type: {
      //   connect: {
      //     id: typeId
      //   }
      // },
      // program: {
      //   connect: {
      //     id: programId
      //   }
      // },
      // status: {
      //   connect: {
      //     id: statusId
      //   }
      // },
      // submitter: {
      //   connect: {
      //     id: submitterId
      //   }
      // },
      // reportOrigin: {
      //   connect: {
      //     id: reportOriginId
      //   }
      // }
    }
  })

  return added
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

export {
  getEvent, getEvents, getEventsCount,
  addEvent,
  deleteEvent,
  exportEvents,
  addSpecimenToEvent
}

