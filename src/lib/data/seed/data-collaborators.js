const source = require('./sources/intervenant.json')

const { stringOrNull, stringToBool, trimmedString } = require('./utils')

const transformed = source.map(p => {
  const { id_intervenant, nom, actif } = p
  return {
    id: parseInt(id_intervenant, 10),
    name: trimmedString(nom),
    isActive: stringToBool(actif)
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
