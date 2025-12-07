const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_animal_type_mesure.json')

const transformed = source.map(p => {
  const { id, nom, unite, id_groupe, description, id_unite_defaut, id_type_unite } = p
  return {
    id: parseInt(id, 10),
    name: nom.trim().replaceAll("''", "'"),
    animalGroupId: parseInt(id_groupe, 10),
    description: description?.trim().replaceAll("''", "'"),
    defaultUnitId: parseInt(id_unite_defaut, 10),
    unitTypeId: parseInt(id_type_unite, 10)
  }
})

module.exports = transformed
