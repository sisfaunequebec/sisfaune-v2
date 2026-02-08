'use server'

import { getAnalysis } from '@/lib/data/analyses/service'

const getAnalysisAction = async (analysisId) => {
  const result = await getAnalysis(analysisId)
  return result
}

export default getAnalysisAction
