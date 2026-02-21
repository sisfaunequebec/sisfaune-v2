'use server'
import 'server-only'

import { DateTime } from 'luxon'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import laboratoryTransformer from '../transformers/to-db/laboratory'

import { dbDateToIso } from '../transformers/utils'

const validate = (updated, current) => {
  const { labReceivedAt } = updated
  const { discoveredAt, collectedAt, reportedAt, labShippedAt } = current

  if (labReceivedAt) {
    if (reportedAt && DateTime.fromISO(labReceivedAt) < DateTime.fromISO(reportedAt)) {
      return { labReceivedAt: `La date de réception doit être égale ou postérieure à la date de signalement (${dbDateToIso(reportedAt)})` }
    }

    if (discoveredAt && DateTime.fromISO(labReceivedAt) < DateTime.fromJSDate(discoveredAt)) {
      return { labReceivedAt: `La date de réception doit être égale ou postérieure à la date de découverte (${dbDateToIso(discoveredAt)})` }
    }

    if (collectedAt && DateTime.fromISO(labReceivedAt) < DateTime.fromJSDate(collectedAt)) {
      return { labReceivedAt: `La date de réception doit être égale ou postérieure à la date de récolte (${dbDateToIso(collectedAt)})` }
    }

    if (labShippedAt && DateTime.fromISO(labReceivedAt) < DateTime.fromJSDate(labShippedAt)) {
      return { labReceivedAt: `La date de réception doit être égale ou postérieure à la date d'expédition au laboratoire (${dbDateToIso(labShippedAt)})` }
    }
  }

  return null
}

const updateLaboratory = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const current = await orm.event.findUnique({
    where: {
      id: eventId
    }
  })

  if (!current) {
    throw new Error()
   }

  const validationError = validate(data, current)
  if (validationError) {
    return { data: null, errors: validationError }
  }

  const transformed = laboratoryTransformer(data, { user })

  await orm.event.update({
    where: {
      id: eventId,
    },
    data: transformed
  })

  return { data, errors: null }
}

export {
  updateLaboratory
}

