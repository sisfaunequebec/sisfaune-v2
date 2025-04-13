const source = require('./sources/lut_euthanasie_organisme.json')

const transformed = source.map(p => {
  const { id_organisme, nom, actif } = p
  return {
    id: parseInt(id_organisme, 10),
    name: nom.trim().replaceAll("''", "'"),
    isActive: actif === '1'
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
