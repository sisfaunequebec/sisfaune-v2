const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull, trimmedString } = require('./utils')

const source = require('./sources/lut_animal_cause_mort.json')

const transformed = source.map(p => {
  const { id, cause, nom_cccsf, actif, ordre_affichage } = p
  return {
    id: id,
    name: trimmedString(cause),
    cccsfName: trimmedString(nom_cccsf),
    isActive: stringToBool(actif),
    displayOrder: parseIntegerOrNull(ordre_affichage)
  }
})

module.exports = transformed
