import transform from '../transform'

const schema = {
  id: null,
  name: null,
  code: null,
  isActive: null,
  resultType: null,
  groupName: analysis => { const { analysisGroup } = analysis; const { name } = analysisGroup; return name },
  sectorName: analysis => { const { analysisGroup } = analysis; const { analysisSector } = analysisGroup; const { name } = analysisSector; return name },
}

const analysisTransformer = (analysis, context) => {
  const transformed = transform(schema, analysis, context) 
  return transformed
}

export default analysisTransformer