const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_animal_age.json')

const transformed = source.map(p => {
  const { id, age, age_cccsf, actif, description, id_groupe } = p
  return {
    id: id,
    name: age.trim().replaceAll("''", "'"),
    cccsfName: stringOrNull(age_cccsf),
    isActive: actif,
    description: description?.trim().replaceAll("''", "'"),
    groupId: id_groupe
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
