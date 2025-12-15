const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_type_resultat_texte.json')

const transformed = source.map(p => {
  const { id_type_resultat_texte, id_type_resultat } = p
  return {
    id: parseIntegerOrNull(id_type_resultat_texte),
    resultTypeId: parseIntegerOrNull(id_type_resultat),
  }
})

module.exports = transformed
