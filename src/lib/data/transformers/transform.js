const transform = (schema, data, context, direction = 'fromDB') => {

  const keysToRemoveFromData = Object.keys(schema)

  const transformed = Object.entries(schema).reduce((acc, [key, entry]) => { 
    const transformer = entry[direction]
    const value = data[key]
    if (!transformer) {
      acc[key] = value
      return acc
    }
    if (typeof transformer === 'function') {
      const returned = transformer(value, data, context, direction)
      if (returned && typeof returned === 'object' && 'values' in returned && Array.isArray(returned.values)) {
        acc[key] = returned.values
        if (returned.keysToRemove && Array.isArray(returned.keysToRemove)) {
          keysToRemoveFromData.push(...returned.keysToRemove)
        }
      } else {
        acc[key] = returned
      }
      acc[key] = transformer(value, data, context, direction)
    } else {
      acc[key] = transformer
    }
    return acc
  }, {})

  const dataFiltered = removeKeys(data, keysToRemoveFromData)
  const combined = { ...dataFiltered, ...transformed }

  return combined
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