const source = require('./sources/lut_muni_geom.json')

const transformed = source.map(p => {
  const {
    id,
    version,
    vertex,
    id_muni,
    geom
  } = p

  return {
    id: parseInt(id, 10),
    version,
    // nbVertices: parseInt(vertex, 10),
    localityId: parseInt(id_muni, 10),
    geomAsText: geom
  }
})

module.exports = transformed
