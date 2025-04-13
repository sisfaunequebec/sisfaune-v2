const source = require('./sources/lut_signalement_provenance.json')

const transformed = source.map(p => {
  const { id, provenance, provenance_raton, actif } = p
  return {
    id: parseInt(id, 10),
    name: provenance.trim().replaceAll("''", "'"),
    nameRacoon: provenance.trim().length ? provenance.trim().replaceAll("''", "'") : null,
    isActive: actif === '1'
  }
})

module.exports = transformed
