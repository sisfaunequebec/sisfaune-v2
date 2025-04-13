const source = require('./sources/lut_animal_cause_mort.json')

const transformed = source.map(p => {
  const { id, cause, nom_cccsf, actif, ordre_affichage } = p
  return {
    id: parseInt(id, 10),
    name: cause.trim().replaceAll("''", "'"),
    cccsfName: nom_cccsf.trim(),
    isActive: actif === '1',
    displayOrder: parseInt(ordre_affichage, 10)
  }
})

module.exports = transformed
