const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull, trimmedString } = require('./utils')

const source = require('./sources/lut_animal_age.json')

const transformed = source.map(p => {
  const { id, age, groupe, age_cccsf, actif, description } = p
  return {
    id: parseIntegerOrNull(id),
    name: trimmedString(age),
    group: trimmedString(groupe),
    cccsfName: stringOrNull(age_cccsf),
    isActive: stringToBool(actif),
    description: trimmedString(description)
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
