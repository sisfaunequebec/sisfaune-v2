import transform from '../transform'

const fixCoordinates = (value) => {
  return value ? parseFloat(value.toString()) : 0
}

const getLocationType = (location) => {
  const { typeId } = location
  return typeId ? { id: typeId, name: typeId } : null
}

const getCoordinates = (location) => {
  const { latitude, longitude } = location
  return (latitude && longitude) ? { latitude: fixCoordinates(latitude), longitude: fixCoordinates(longitude) } : null
}

const schema = {
  type: location => getLocationType(location),
  coordinates: location => getCoordinates(location),
  description: null,
  locality: location => { const { locality} = location; return { name: locality?.name, province: locality?.province }}
}

const locationTransformer = (location, context) => {
  const transformed = transform(schema, location, context) 
  return transformed
}

export default locationTransformer