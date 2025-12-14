const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_groupe_analyse.json')

const transformed = source.map(p => {
  const { id, nom, code, actif, id_secteur_analyse } = p
  return {
    id: parseIntegerOrNull(id),
    name: nom.trim().replaceAll("''", "'"),
    code: code?.trim().replaceAll("''", "'"),
    isActive: stringToBool(actif),
    analysisSectorId: parseIntegerOrNull(id_secteur_analyse)
  }
})

module.exports = transformed
