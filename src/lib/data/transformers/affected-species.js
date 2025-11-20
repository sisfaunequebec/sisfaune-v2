
const affectedSpeciesKeys = [1, 2, 3, 4, 5].flatMap(i => [
  `affectedSpecie${i}Id`,
  `affectedSpecie${i}AliveCount`,
  `affectedSpecie${i}UnhealtyCount`,
  `affectedSpecie${i}DeadCount`,
  `affectedSpecie${i}NotSpecifiedCount`
])

const buildAffectedSpecies = (data) => {
  return [1, 2, 3, 4, 5].map(i => ({
    index: i,
    specieId: data[`affectedSpecie${i}Id`],
    aliveCount: data[`affectedSpecie${i}AliveCount`],
    unhealthyCount: data[`affectedSpecie${i}UnhealtyCount`],
    deadCount: data[`affectedSpecie${i}DeadCount`],
    notSpecifiedCount: data[`affectedSpecie${i}NotSpecifiedCount`]
  }))
}

const affectedSpeciesTransformer = (value, data, context, direction) => {
  // const { affectedSpecie1Id, affectedSpecie1AliveCount, affectedSpecie1UnhealtyCount, affectedSpecie1DeadCount, affectedSpecie1NotSpecifiedCount } = data
  // const { affectedSpecie2Id, affectedSpecie2AliveCount, affectedSpecie2UnhealtyCount, affectedSpecie2DeadCount, affectedSpecie2NotSpecifiedCount } = data
  // const { affectedSpecie3Id, affectedSpecie3AliveCount, affectedSpecie3UnhealtyCount, affectedSpecie3DeadCount, affectedSpecie3NotSpecifiedCount } = data
  // const { affectedSpecie4Id, affectedSpecie4AliveCount,  affectedSpecie4UnhealtyCount, affectedSpecie4DeadCount, affectedSpecie4NotSpecifiedCount } = data
  // const { affectedSpecie5Id, affectedSpecie5AliveCount, affectedSpecie5UnhealtyCount, affectedSpecie5DeadCount, affectedSpecie5NotSpecifiedCount } = data
  // return {
  //   values: [
  //     { index: 1, specieId: affectedSpecie1Id, aliveCount: affectedSpecie1AliveCount, unhealthyCount: affectedSpecie1UnhealtyCount, deadCount: affectedSpecie1DeadCount, notSpecifiedCount: affectedSpecie1NotSpecifiedCount },
  //     { index: 2, specieId: affectedSpecie2Id, aliveCount: affectedSpecie2AliveCount, unhealthyCount: affectedSpecie2UnhealtyCount, deadCount: affectedSpecie2DeadCount, notSpecifiedCount: affectedSpecie2NotSpecifiedCount },
  //     { index: 3, specieId: affectedSpecie3Id, aliveCount: affectedSpecie3AliveCount, unhealthyCount: affectedSpecie3UnhealtyCount, deadCount: affectedSpecie3DeadCount, notSpecifiedCount: affectedSpecie3NotSpecifiedCount },
  //     { index: 4, specieId: affectedSpecie4Id, aliveCount: affectedSpecie4AliveCount, unhealthyCount: affectedSpecie4UnhealtyCount, deadCount: affectedSpecie4DeadCount, notSpecifiedCount: affectedSpecie4NotSpecifiedCount },
  //     { index: 5, specieId: affectedSpecie5Id, aliveCount: affectedSpecie5AliveCount, unhealthyCount: affectedSpecie5UnhealtyCount, deadCount: affectedSpecie5DeadCount, notSpecifiedCount: affectedSpecie5NotSpecifiedCount }
  //   ],
  //   keysToRemove: [
  //     'affectedSpecie1Id', 'affectedSpecie1AliveCount', 'affectedSpecie1UnhealtyCount', 'affectedSpecie1DeadCount', 'affectedSpecie1NotSpecifiedCount',
  //     'affectedSpecie2Id', 'affectedSpecie2AliveCount', 'affectedSpecie2UnhealtyCount', 'affectedSpecie2DeadCount', 'affectedSpecie2NotSpecifiedCount',
  //     'affectedSpecie3Id', 'affectedSpecie3AliveCount', 'affectedSpecie3UnhealtyCount', 'affectedSpecie3DeadCount', 'affectedSpecie3NotSpecifiedCount',
  //     'affectedSpecie4Id', 'affectedSpecie4AliveCount', 'affectedSpecie4UnhealtyCount', 'affectedSpecie4DeadCount', 'affectedSpecie4NotSpecifiedCount',
  //     'affectedSpecie5Id', 'affectedSpecie5AliveCount', 'affectedSpecie5UnhealtyCount', 'affectedSpecie5DeadCount', 'affectedSpecie5NotSpecifiedCount'
  //   ]
  // }
  return {
    values: buildAffectedSpecies(data),
    keysToRemove: affectedSpeciesKeys
  }
}

export default affectedSpeciesTransformer