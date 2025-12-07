const source = require('./sources/lut_mesure_unite.json')

const transformed = source.map(p => {
  const { id, type, unite, facteur } = p
  return {
    id: parseInt(id, 10),
    typeId: parseInt(type, 10),
    name: unite.trim().replaceAll("''", "'"),
    multiplier: parseFloat(facteur),
  }
}).filter(p => p.id !== 0)

module.exports = transformed
