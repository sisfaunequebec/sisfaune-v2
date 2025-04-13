const source = require('./sources/lut_animal_groupe_v2.json')

const transformed = source.map(p => {
  const { id_groupe, groupe, id_parent } = p

  const parentId = parseInt(id_parent, 10)

  return {
    id: parseInt(id_groupe, 10),
    name: groupe.replaceAll("''", "'"),
    parentGroupId: parentId === 0 ? null : parentId // replace 0 by null
  }
})

module.exports = transformed
