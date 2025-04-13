const source = require('./sources/lut_muni.json')

const transformed = source.map(p => {
  const {
    id_muni, nom_muni,
    id_type, type,
    id_mrc, nom_mrc,
    id_ra, nom_ra,
    province, version
  } = p

  return {
    id: parseInt(id_muni, 10),
    name: nom_muni.trim().replaceAll("''", "'"),
    typeId: id_type.trim().replaceAll("''", "'"),
    typeName: type.trim().replaceAll("''", "'"),
    mrcId: parseInt(id_mrc, 10),
    mrcName: nom_mrc.trim().replaceAll("''", "'"),
    regionId: parseInt(id_ra, 10),
    regionName: nom_ra.trim().replaceAll("''", "'"),
    province: province.trim().replaceAll("''", "'"),
    version: version.trim().replaceAll("''", "'")
  }
})

module.exports = transformed
