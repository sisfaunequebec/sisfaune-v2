const source = require('./sources/x_evenement_groupeanalyse.json')

const transformed = source.map(p => {
  const { id_evenement, id_groupe_analyse } = p
  return {
    eventId: parseInt(id_evenement, 10),
    analysisGroupId: parseInt(id_groupe_analyse, 10)
  }
})

module.exports = transformed


