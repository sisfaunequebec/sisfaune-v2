const source = require('./sources/lut_habitat_type.json')

const transformed = source.map(p => {
  const { id, habitat, type_habitat } = p
  return {
    id: parseInt(id, 10),
    name: type_habitat.trim().replaceAll("''", "'"),
    group: habitat.trim().replaceAll("''", "'")
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
