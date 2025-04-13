const source = require('./sources/lut_type_echantillon.json')

const transformed = source.map(p => {
  const { id_type, type, id_ccwhc } = p
  return {
    id: parseInt(id_type, 10),
    name: type.trim().replaceAll("''", "'"),
    ccwhcId: parseInt(id_ccwhc, 10)
  }
})

module.exports = transformed
