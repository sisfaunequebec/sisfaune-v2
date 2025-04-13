const source = require('./sources/lut_evenement_type.json')

const transformed = source.map(p => {
  const { id, nom } = p
  return {
    id: parseInt(id, 10),
    name: nom.trim().replaceAll("''", "'")
  }
})

module.exports = transformed
