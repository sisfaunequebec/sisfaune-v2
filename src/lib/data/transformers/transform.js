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

// // remove array of keys from an object
// export const removeKeys = (obj, keys) => {
//   const filtered = Object.entries(obj).reduce((acc, [key, value]) => {
//     if (!keys.includes(key)) {
//       acc[key] = value
//     }
//     return acc
//   }, {})
//   return filtered
// }

// // pick array of keys from an object
// export const pickKeys = (obj, keys) => {
//   const picked = Object.entries(obj).reduce((acc, [key, value]) => {
//     if (keys.includes(key)) {
//       acc[key] = value
//     }
//     return acc
//   }, {})
//   return picked
// }