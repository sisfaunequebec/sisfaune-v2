const { DateTime } = require('luxon')

const trimmedString = (str) => {
  if (!str) return null
  const result = str.trim().replaceAll("''", "'")
  return result
}

const stringOrNull = (str) => {
  try {
    const trimmed = trimmedString(str) // str.trim().replaceAll("''", "'")
    const result = trimmed.length ? trimmed : null
    return result
  } catch (e) {
    // console.debug('stringOrNull', str)
    return null
  }
}

const stringToBool = (str) => {
  if (!str) return false
  const trimmed = trimmedString(str)
  const result = trimmed === '1'
  return result
}

// 1. We parse a datetime string from SQL Server but we only are interested in the date part
// 2. Postgres stores this in a date (without time or timezone) column, in implicit UTC
// 3. Prisma needs a JS date
// So we parse from string, imposing the zone, then convert to UTC without changing the time
// so if the input is '2010-01-01:00.00.00-04', we get '2010-01-01:00.00.00Z', converted to JS, then stored as '2010-01-01'
const dateOrNull = (str) => {
  if (!str) return null
  const result = DateTime.fromSQL(str.trim(), { zone: 'America/New_York', setZone: true }).toUTC(0, { keepLocalTime: true }).toJSDate()
  return result
}

const stringToInteger = (str) => {
  if (!str) return false
  // const trimmed = trimmedString(str)
  const result = parseInt(str, 10)
  return result
}

module.exports = {
  trimmedString,
  stringOrNull,
  stringToBool,
  dateOrNull,
  stringToInteger
}