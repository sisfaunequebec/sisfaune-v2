const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_type_resultat.json')

const transformed = source.map(p => {
  const { id, description } = p
  return {
    id: parseIntegerOrNull(id),
    name: description.trim().replaceAll("''", "'")
  }
})

module.exports = transformed
