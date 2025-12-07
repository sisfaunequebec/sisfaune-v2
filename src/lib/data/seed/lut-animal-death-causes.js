const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_animal_cause_mort.json')

const transformed = source.map(p => {
  const { id, cause, nom_cccsf, actif, ordre_affichage } = p
  return {
    id: id,
    name: cause.trim().replaceAll("''", "'"),
    cccsfName: nom_cccsf.trim().replaceAll("''", "'"),
    isActive: stringToBool(actif),
    displayOrder: parseIntegerOrNull(ordre_affichage)
  }
})

module.exports = transformed
