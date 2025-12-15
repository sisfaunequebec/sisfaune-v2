const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_type_resultat_code.json')

const transformed = source.map(p => {
  const { id_type_resultat_code, id_type_resultat } = p
  return {
    id: parseIntegerOrNull(id_type_resultat_code),
    resultTypeId: parseIntegerOrNull(id_type_resultat),
  }
})

module.exports = transformed
