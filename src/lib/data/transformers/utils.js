import { DateTime } from 'luxon'

const dbDateToIso = (date) => {
  if (!date) {
    return null
  }
  const result = DateTime.fromJSDate(date, { zone: 'UTC', setZone: true }).toISODate()
  return result
}

const isoDateToDb = (str) => {
  if (!str) {
    return null
  }
  const result = DateTime.fromISO(str).setZone('UTC', { keepLocalTime: true }).toJSDate()
  return result
}

export {
  dbDateToIso,
  isoDateToDb
} 