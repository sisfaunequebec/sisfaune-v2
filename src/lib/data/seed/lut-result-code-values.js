const source = require('./sources/lut_resultat_code_valeur.json')

const transformed = source.map(p => {
  const { id, code, description, actif, ordre_affichage, id_analyse } = p
  return {
    id: parseInt(id, 10),
    analysisId: parseInt(id_analyse, 10),
    code: code.trim().replaceAll("''", "'"),
    description: description.trim().replaceAll("''", "'"),
    isActive: actif === '1',
    displayOrder: parseInt(ordre_affichage, 10),
  }
})

module.exports = transformed


