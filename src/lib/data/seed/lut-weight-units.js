const source = require('./sources/lut_poids_unite.json')

const transformed = source.map(p => {
  const { id, unite, facteur_conversion } = p
  return {
    id: parseInt(id, 10),
    name: unite.trim().replaceAll("''", "'"),
    conversionFactor: parseFloat(facteur_conversion)
  }
}).filter(p => p.id !== 0)

module.exports = transformed
