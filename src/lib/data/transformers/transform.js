const transform = (schema, data, context) => {
  const transformed = Object.entries(schema).reduce((acc, [key, entry]) => { 
    const transformer = entry

    if (!transformer) {
      acc[key] = data[key]
      return acc
    }

    if (typeof transformer === 'function') {
      const returned = transformer(data, context)
      acc[key] = returned
      return acc
    }
    
    return acc
  }, {})

  return transformed
}

export default transform

