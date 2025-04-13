const source = require('./sources/lut_animal_age.json')

const transformed = source.map(p => {
  const { id, age, groupe, age_cccsf, actif, description } = p
  return {
    id: parseInt(id, 10),
    name: age.trim().length === 0 ? null : age.trim().replaceAll("''", "'"),
    group: groupe.trim().replaceAll("''", "'"),
    cccsfName: age_cccsf ? age_cccsf.trim() : null,
    isActive: actif === '1',
    description
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
