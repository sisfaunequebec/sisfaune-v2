const transform = (schema, data, context) => {

  // const keysToRemoveFromData = Object.keys(schema)

  const transformed = Object.entries(schema).reduce((acc, [key, entry]) => { 
    const transformer = entry

    if (!transformer) {
      acc[key] = data[key]
      return acc
    }

    if (typeof transformer === 'function') {
      const returned = transformer(data, context)
      acc[key] = returned
      // if (returned && typeof returned === 'object' && 'values' in returned) {
      //   console.debug('transformer with values for key', key, returned)
      //   acc[key] = returned.values
      //   if (returned.keysToRemove && Array.isArray(returned.keysToRemove)) {
      //     keysToRemoveFromData.push(...returned.keysToRemove)
      //   }
      // } else {
      //   acc[key] = returned
      // }
      return acc
    }
    
    return acc
  }, {})

  // console.debug('transform result', transformed, keysToRemoveFromData)
  // const dataFiltered = removeKeys(data, keysToRemoveFromData)
  // const combined = { ...transformed }
  // console.debug('transform result', transformed)

  return transformed
}

export default transform

// remove array of keys from an object
export const removeKeys = (obj, keys) => {
  const filtered = Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {})
  return filtered
}

// pick array of keys from an object
export const pickKeys = (obj, keys) => {
  const picked = Object.entries(obj).reduce((acc, [key, value]) => {
    if (keys.includes(key)) {
      acc[key] = value
    }
    return acc
  }, {})
  return picked
}