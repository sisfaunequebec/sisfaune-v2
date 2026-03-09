import transform from '../transform'

const schema = {
  name: null,
  code: null,
  isActive: null,
  unit: null,
  lowerLimit: null,
  upperLimit: null
}

const analysisTransformer = (analysis, context) => {
  const transformed = transform(schema, analysis, context) 
  return transformed
}

export default analysisTransformer