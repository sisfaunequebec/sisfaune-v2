import transform from '../transform'

const fixNumbers = (value) => {
  console.debug('Fixing number', value, value.toString(), typeof value) 
  return value ? parseFloat(value.toString()) : 0
}

const schema = {
  id: null,
  name: null,
  code: null,
  isActive: null,
  resultType: null,
  unit: null,
  lowerLimit: analysis => { const { lowerLimit } = analysis; return lowerLimit ? fixNumbers(lowerLimit) : null },   
  upperLimit: analysis => { const { upperLimit } = analysis; return upperLimit ? fixNumbers(upperLimit) : null },  
  codeValues: null,
  groupName: analysis => { const { analysisGroup } = analysis; const { name } = analysisGroup; return name },
  sectorName: analysis => { const { analysisGroup } = analysis; const { analysisSector } = analysisGroup; const { name } = analysisSector; return name },
}

const analysisTransformer = (analysis, context) => {
  
  const transformed = transform(schema, analysis, context) 
  console.debug('transformed', transformed)  
  return transformed
}

export default analysisTransformer