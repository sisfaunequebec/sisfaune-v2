const source = require('./sources/lut_methode_expedition.json')

const transformed = source.map(p => {
  const { id, methode } = p
  return {
    id: parseInt(id, 10),
    name: methode.trim().length === 0 ? null : methode.trim().replaceAll("''", "'")
  }
}).filter(p => p.id !== 0)

module.exports = transformed
