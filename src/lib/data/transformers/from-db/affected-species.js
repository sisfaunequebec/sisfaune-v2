
const affectedSpeciesKeys = [1, 2, 3, 4, 5].flatMap(i => [
  `affectedSpecie${i}`,
  `affectedSpecie${i}Id`,
  `affectedSpecie${i}AliveCount`,
  `affectedSpecie${i}UnhealtyCount`,
  `affectedSpecie${i}DeadCount`,
  `affectedSpecie${i}NotSpecifiedCount`
])

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

const affectedSpeciesTransformer = (value, data, context, direction) => {
  return {
    values: buildAffectedSpecies(data),
    keysToRemove: affectedSpeciesKeys
  }
}

export default affectedSpeciesTransformer