const { stringOrNull, stringToBool, dateOrNull, stringToInteger, trimmedString } = require('./utils')

const source = require('./sources/lut_animal_cause_mort.json')

const transformed = source.map(p => {
  const { id, cause, nom_cccsf, actif, ordre_affichage } = p
  return {
    id: stringToInteger(id),
    name: trimmedString(cause),
    cccsfName: trimmedString(nom_cccsf),
    isActive: stringToBool(actif),
    displayOrder: stringToInteger(ordre_affichage)
  }
})

module.exports = transformed
