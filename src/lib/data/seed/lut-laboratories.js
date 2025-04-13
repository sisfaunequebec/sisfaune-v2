const source = require('./sources/lut_laboratoire.json')

const transformed = source.map(p => {
  const { id_laboratoire, laboratoire, actif } = p
  return {
    id: parseInt(id_laboratoire, 10),
    name: laboratoire.trim().replaceAll("''", "'"),
    isActive: actif === '1'
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
