import transform from '../transform'

const fixCoordinates = (value) => {
  // console.debug('Fix coordinates value', value)
  return value ? parseFloat(value.toString()) : 0
}

const schema = {
  typeId: null,
  latitude: location => fixCoordinates(location.latitude),
  longitude: location => fixCoordinates(location.longitude),
  locality: location => { const { locality} = location; return { name: locality?.name, province: locality?.province }}
}

const locationTransformer = (location, context) => {
  // console.debug('Location transformer input', location)
  const transformed = transform(schema, location, context) 
  return transformed
}

export default locationTransformer