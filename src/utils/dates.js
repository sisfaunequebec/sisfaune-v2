const { DateTime } = require('luxon')

const DB_TZ = 'UTC'
const LOCAL_TZ = 'America/New_York'
const DEFAULT_FORMAT = 'yyyy-LL-dd'

const sqlStringToJs = (str) => {
  if (!str) return null
  return DateTime.fromSQL(str, { zone: LOCAL_TZ }).toUTC().toJSDate()
}

const isoUTCStringToFormat = (str) => {
  if (!str) return null
  return DateTime.fromISO(str, { setZone: true }).toFormat(DEFAULT_FORMAT)
}

const isoStringToJsDate = (str) => {
  if (!str) return null
  const result = DateTime.fromISO(str, { setZone: true }).toJSDate()
  return result
}

const jsToFormat = (jsDate, format = DEFAULT_FORMAT) => {
  if (!jsDate) return null
  return DateTime.fromJSDate(jsDate).toFormat(format, { zone: LOCAL_TZ })
}

module.exports = { 
  DB_TZ,
  LOCAL_TZ,
  DEFAULT_FORMAT,

  sqlStringToJs,
  isoUTCStringToFormat,
  isoStringToJsDate,
  jsToFormat
}