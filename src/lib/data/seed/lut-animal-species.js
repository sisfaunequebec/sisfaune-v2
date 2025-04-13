const source = require('./sources/lut_animal_espece.json')

const speciesGroup = require('./sources/x_espece_groupe_v2.json')

const speciesGroupBySpecieId = speciesGroup.reduce((acc, g) => {
  const { id_espece, id_groupe_v2 } = g

  const specieId = parseInt(id_espece, 10)
  const groupId = parseInt(id_groupe_v2, 10)

  acc[specieId] = groupId
  return acc
}, {})

const filterOutUndeterminedSpecie = (s) => { return s.id_espece !== '0' }

const transformed = source
  .filter(filterOutUndeterminedSpecie)
  .map(p => {
    const { id_espece, groupe: groupName, nom_francais, binome, id_famille } = p

    const specieId = parseInt(id_espece, 10)
    const groupId = speciesGroupBySpecieId[specieId] || null

    return {
      id: specieId,
      name: nom_francais.trim().replaceAll("''", "'"),
      binome: binome.trim().length === 0 ? null : binome.trim(),
      groupId
    }
  })

module.exports = transformed
