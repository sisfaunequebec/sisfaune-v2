const source = require('./sources/lut_methode_euthanasie.json')

const transformed = source.map(p => {
  const { id_methode, methode, actif } = p
  return {
    id: parseInt(id_methode, 10),
    name: methode.trim().replaceAll("''", "'"),
    isActive: actif === '1'
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
