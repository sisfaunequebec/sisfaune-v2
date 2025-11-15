const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull, trimmedString } = require('./utils')

const source = require('./sources/lut_secteur_analyse.json')

const transformed = source.map(p => {
  const { id, nom } = p
  return {
    id: parseIntegerOrNull(id),
    name: trimmedString(nom)
  }
})

module.exports = transformed
