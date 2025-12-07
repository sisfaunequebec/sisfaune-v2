const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_secteur_analyse.json')

const transformed = source.map(p => {
  const { id, nom } = p
  return {
    id: parseIntegerOrNull(id),
    name: nom.trim().replaceAll("''", "'")
  }
})

module.exports = transformed
