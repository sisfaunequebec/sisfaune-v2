
const buildAffectedSpecies = (data) => {
  return [1, 2, 3, 4, 5].map(i => {
    const affectedSpecie = data[`affectedSpecie${i}`]
    const { id, name, binome } = affectedSpecie || {}
    return {
      index: i,
      specieId: id,
      specieName: name,
      specieBinome: binome,
      aliveCount: data[`affectedSpecie${i}AliveCount`],
      unhealthyCount: data[`affectedSpecie${i}UnhealtyCount`],
      deadCount: data[`affectedSpecie${i}DeadCount`],
      notSpecifiedCount: data[`affectedSpecie${i}NotSpecifiedCount`]
    }
  })
}

const affectedSpeciesTransformer = (data) => {
  return buildAffectedSpecies(data)
}

export default affectedSpeciesTransformer