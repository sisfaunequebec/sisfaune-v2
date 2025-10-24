const { DateTime } = require('luxon')

const stringOrNull = (str) => {
  try {
    if (!str) return null
    const trimmed = str.trim().replaceAll("''", "'")
    return trimmed.length ? trimmed : null
  } catch (e) {
    console.debug('stringOrNull', str)
  }
}

const stringToBool = (str) => {
  if (!str) return false
  return str.trim() === '1'
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

module.exports = {
  stringOrNull,
  stringToBool,
  dateOrNull
}