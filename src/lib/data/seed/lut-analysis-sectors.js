const { stringOrNull, stringToBool, dateOrNull, stringToInteger, trimmedString } = require('./utils')

const source = require('./sources/lut_secteur_analyse.json')

const transformed = source.map(p => {
  const { id, nom } = p
  return {
    id: stringToInteger(id),
    name: trimmedString(nom)
  }
})

module.exports = transformed
