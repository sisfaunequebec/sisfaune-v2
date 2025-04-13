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

const dateOrNull = (str) => {
  if (!str) return null
  return DateTime.fromSQL(str.trim()).toJSDate()
}

module.exports = {
  stringOrNull,
  stringToBool,
  dateOrNull
}