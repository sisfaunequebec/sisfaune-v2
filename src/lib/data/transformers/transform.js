const transform = (schema, data, context, direction = 'fromDB') => {
  const transformed = Object.entries(data).reduce((acc, [key, entry]) => {
    const transformerEntry = schema[key]
    if (!transformerEntry) {
      acc[key] = entry
      return acc
    }
    const transformer = transformerEntry[direction]
    if (!transformer) {
      acc[key] = entry
      return acc
    }
    if (typeof transformer === 'function') {
      acc[key] = transformer(entry, context, direction)
    } else {
      acc[key] = transformer
    }
    return acc
  }, {})

  // const keysToAdd = Object.entries(schema).filter(([key, _]) => { return !dataKeys.includes(key) }).reduce((acc, [key, entry]) => { acc[key] = entry; return acc; }, {})
  // // console.debug(keysToAdd)

  // // Then add any entry in schema but not already in data
  // const added = Object.entries(keysToAdd).reduce((acc, [key, entry]) => {
  //   // console.debug(key)
  //   const transformerEntry = entry
  //   if (!transformerEntry) {
  //     acc[key] = undefined
  //     return acc
  //   }
  //   const transformer = transformerEntry[direction]
  //   if (!transformer) {
  //     acc[key] = undefined
  //     return acc
  //   }
  //   if (typeof transformer === 'function') {
  //     acc[key] = transformer(data, context, direction)
  //   } else {
  //     acc[key] = transformer
  //   }
  //   // console.debug(acc)
  //   return acc
  // }, {})

  return transformed
}

export default transform